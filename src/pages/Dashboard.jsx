import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import { useTasks } from '../context/TaskContext'

export default function Dashboard() {
  const { stats, visibleTasks, view, filter, setFilter } = useTasks()

  return (
    <div className="dashboard-grid">
      <section className="hero-card card">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h3>Stay focused on what matters most.</h3>
          <p className="muted">Capture ideas, prioritize deep work, and keep your tasks moving with clarity.</p>
        </div>
        <div className="stat-row">
          <div className="stat-box">
            <strong>{stats.total}</strong>
            <span>Total tasks</span>
          </div>
          <div className="stat-box">
            <strong>{stats.pending}</strong>
            <span>Pending</span>
          </div>
          <div className="stat-box">
            <strong>{stats.dueSoon}</strong>
            <span>Due soon</span>
          </div>
        </div>
      </section>

      <TaskForm />

      <section className="card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">Today’s flow</p>
            <h3>Your tasks</h3>
          </div>
          <div className="chip-row">
            <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`chip ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
            <button className={`chip ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
          </div>
        </div>

        <div className={view === 'list' ? 'task-list stack' : 'task-list grid'}>
          {visibleTasks.length ? (
            visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="empty-state">
              <h4>No tasks match this view yet.</h4>
              <p>Add a fresh task and keep your day moving.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
