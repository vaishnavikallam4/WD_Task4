import { useState } from 'react'
import { FiCheckCircle, FiCircle, FiEdit2, FiSave, FiTrash2, FiX } from 'react-icons/fi'
import { format, parseISO } from 'date-fns'
import { useTasks } from '../context/TaskContext'

export default function TaskCard({ task }) {
  const { toggleComplete, deleteTask, updateTask, draggedTaskId, setDraggedTaskId, reorderTasks } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task)

  const dueLabel = task.dueDate
    ? format(parseISO(task.dueDate), 'MMM d')
    : 'No deadline'

  const saveEdit = () => {
    updateTask(task.id, {
      title: draft.title,
      description: draft.description,
      priority: draft.priority,
      category: draft.category,
      dueDate: draft.dueDate,
    })
    setIsEditing(false)
  }

  const handleDrop = () => {
    if (draggedTaskId && draggedTaskId !== task.id) {
      reorderTasks(draggedTaskId, task.id)
    }
    setDraggedTaskId(null)
  }

  return (
    <article
      className={`task-card ${task.completed ? 'completed' : ''} ${draggedTaskId === task.id ? 'dragging' : ''}`}
      draggable={!isEditing}
      onDragStart={() => setDraggedTaskId(task.id)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      onDragEnd={() => setDraggedTaskId(null)}
    >
      <button className="check-button" onClick={() => toggleComplete(task.id)}>
        {task.completed ? <FiCheckCircle /> : <FiCircle />}
      </button>

      {isEditing ? (
        <div className="edit-form">
          <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
          <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
          <div className="edit-row">
            <select value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value })}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>
              <option>General</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
            <input type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} />
          </div>
          <div className="edit-actions">
            <button className="secondary-button small" onClick={saveEdit}><FiSave /> Save</button>
            <button className="icon-button small" onClick={() => setIsEditing(false)}><FiX /></button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <div className="task-topline">
            <div>
              <h4>{task.title}</h4>
              <p>{task.description || 'No description added.'}</p>
            </div>
            <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
          </div>

          <div className="task-meta">
            <span>{task.category}</span>
            <span>{dueLabel}</span>
          </div>
        </div>
      )}

      <div className="task-actions">
        {!isEditing && (
          <button className="icon-button small" onClick={() => setIsEditing(true)}>
            <FiEdit2 />
          </button>
        )}
        <button className="icon-button small danger" onClick={() => deleteTask(task.id)}>
          <FiTrash2 />
        </button>
      </div>
    </article>
  )
}
