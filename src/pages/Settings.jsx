import { useTasks } from '../context/TaskContext'

export default function Settings() {
  const { clearCompleted, stats } = useTasks()

  return (
    <section className="card settings-card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">Workspace settings</p>
          <h3>Control your flow</h3>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-panel">
          <h4>Quick actions</h4>
          <button className="secondary-button" onClick={clearCompleted}>Clear completed tasks</button>
        </div>
        <div className="settings-panel">
          <h4>Snapshot</h4>
          <ul>
            <li>{stats.total} total tasks</li>
            <li>{stats.pending} still pending</li>
            <li>{stats.highPriority} high-priority tasks</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
