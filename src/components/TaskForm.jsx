import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useTasks } from '../context/TaskContext'

const initialState = {
  title: '',
  description: '',
  priority: 'Medium',
  category: 'General',
  dueDate: '',
}

export default function TaskForm() {
  const [form, setForm] = useState(initialState)
  const { addTask } = useTasks()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    addTask(form)
    setForm(initialState)
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <div className="card-heading">
        <div>
          <p className="eyebrow">Quick capture</p>
          <h3>Add a task</h3>
        </div>
        <button type="submit" className="primary-button">
          <FiPlus />
          Save task
        </button>
      </div>

      <div className="form-grid">
        <label>
          <span>Task title</span>
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="What needs attention?"
          />
        </label>

        <label>
          <span>Category</span>
          <select
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          >
            <option>General</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select
            value={form.priority}
            onChange={(event) => setForm({ ...form, priority: event.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          <span>Due date</span>
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
          />
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea
          rows="3"
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Add a short context or detail..."
        />
      </label>
    </form>
  )
}
