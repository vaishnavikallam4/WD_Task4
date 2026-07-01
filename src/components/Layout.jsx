import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FiCheckCircle, FiHome, FiList, FiSettings, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTasks } from '../context/TaskContext'

const links = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/tasks', label: 'All Tasks', icon: FiList },
  { to: '/settings', label: 'Settings', icon: FiSettings },
]

export default function Layout() {
  const { stats, view, setView, theme, setTheme } = useTasks()
  const themeOptions = ['pink', 'dark']
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cycleTheme = () => {
    const currentIndex = themeOptions.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeOptions.length
    setTheme(themeOptions[nextIndex])
  }

  return (
    <div className="app-shell">
      <button className="mobile-menu-button" aria-label="toggle menu" onClick={() => setMobileMenuOpen((open) => !open)}>
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>
      {mobileMenuOpen && <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div>
          <div className="brand-card">
            <div className="brand-icon">
              <FiCheckCircle />
            </div>
            <div>
              <h1>FocusFlow</h1>
              <p>Plan smarter, finish faster.</p>
            </div>
          </div>

          <div className="nav-section">
            <p className="nav-label">Main</p>
            <nav className="nav-links">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Icon />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="metric-card">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>
          <div className="metric-card">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Productivity dashboard</p>
            <h2>Keep your momentum steady.</h2>
          </div>

          <div className="topbar-actions">
            <div className="toggle-group">
              <button
                className={view === 'board' ? 'toggle active' : 'toggle'}
                onClick={() => setView('board')}
              >
                Board
              </button>
              <button
                className={view === 'list' ? 'toggle active' : 'toggle'}
                onClick={() => setView('list')}
              >
                List
              </button>
            </div>
            <div className="theme-chips">
              {themeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={theme === option ? 'chip active' : 'chip'}
                  onClick={() => setTheme(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="icon-button" aria-label="theme toggle" onClick={cycleTheme}>
              <FiMoon />
            </button>
          </div>
        </header>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
