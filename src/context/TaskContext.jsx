import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { format, isToday, isTomorrow, parseISO } from 'date-fns'

const TaskContext = createContext(null)

const defaultTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Design the landing page',
    description: 'Craft the hero section and highlight the app value.',
    priority: 'High',
    category: 'Work',
    completed: false,
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Review weekly goals',
    description: 'Check the progress against your weekly targets.',
    priority: 'Medium',
    category: 'Personal',
    completed: true,
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    createdAt: new Date().toISOString(),
  },
]

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo-app-tasks')
    return saved ? JSON.parse(saved) : defaultTasks
  })
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('board')
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('todo-app-theme') || 'pink'
  })

  useEffect(() => {
    localStorage.setItem('todo-app-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('todo-app-theme', theme)
  }, [theme])

  useEffect(() => {
    const body = document.body
    body.classList.remove('theme-pink', 'theme-light', 'theme-dark', 'theme-white')
    body.classList.add(`theme-${theme}`)
  }, [theme])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false,
    }
    setTasks((current) => [newTask, ...current])
    toast.success('Task added successfully')
  }

  const updateTask = (id, updates) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    )
    toast.info('Task updated')
  }

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id))
    toast.error('Task removed')
  }

  const toggleComplete = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const clearCompleted = () => {
    setTasks((current) => current.filter((task) => !task.completed))
    toast.warn('Completed tasks cleared')
  }

  const reorderTasks = (sourceId, targetId) => {
    setTasks((current) => {
      const sourceIndex = current.findIndex((task) => task.id === sourceId)
      const targetIndex = current.findIndex((task) => task.id === targetId)

      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
        return current
      }

      const next = [...current]
      const [movedTask] = next.splice(sourceIndex, 1)
      next.splice(targetIndex, 0, movedTask)
      return next
    })
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const pending = total - completed
    const highPriority = tasks.filter((task) => task.priority === 'High' && !task.completed).length
    const dueSoon = tasks.filter((task) => {
      if (!task.dueDate) return false
      const due = parseISO(task.dueDate)
      return !task.completed && (isToday(due) || isTomorrow(due))
    }).length

    return { total, completed, pending, highPriority, dueSoon }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (filter === 'active' && task.completed) return false
      if (filter === 'completed' && !task.completed) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          task.category.toLowerCase().includes(q)
        )
      }
      return true
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'dueDate') return a.dueDate.localeCompare(b.dueDate)
      if (sortBy === 'priority') {
        const order = { High: 0, Medium: 1, Low: 2 }
        return order[a.priority] - order[b.priority]
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [filter, search, sortBy, tasks])

  const value = useMemo(
    () => ({
      tasks,
      visibleTasks,
      stats,
      filter,
      setFilter,
      sortBy,
      setSortBy,
      search,
      setSearch,
      view,
      setView,
      draggedTaskId,
      setDraggedTaskId,
      theme,
      setTheme,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      clearCompleted,
      reorderTasks,
    }),
    [tasks, visibleTasks, stats, filter, sortBy, search, view, draggedTaskId],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  return useContext(TaskContext)
}
