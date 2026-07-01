import TaskCard from '../components/TaskCard'
import { useTasks } from '../context/TaskContext'

export default function Tasks() {
  const { visibleTasks, filter, setFilter, setSortBy, search, setSearch } = useTasks()

  return (
    <section className="card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">Task library</p>
          <h3>Manage everything in one place</h3>
        </div>
        <div className="toolbar">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks" />
          <select onChange={(event) => setSortBy(event.target.value)} defaultValue="created">
            <option value="created">Newest</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>
          <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`chip ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Pending</button>
          <button className={`chip ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
      </div>

      <div className="task-list stack">
        {visibleTasks.length ? (
          visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="empty-state">
            <h4>No tasks to display.</h4>
            <p>Try a different search or add a new task.</p>
          </div>
        )}
      </div>
    </section>
  )
}
