import React, { useState, useEffect } from 'react'
import CONFIG from './config'
import TaskAPI from './api'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Message from './components/Message'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Load tasks on mount
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TaskAPI.getAllTasks()
      setTasks(data)
    } catch (err) {
      setError(CONFIG.MESSAGES.ERROR_NETWORK)
      console.error('Load tasks error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      await TaskAPI.createTask(taskData)
      setSuccess(CONFIG.MESSAGES.SUCCESS_CREATE)
      setError(null)
      await loadTasks()
    } catch (err) {
      setError(CONFIG.MESSAGES.ERROR_CREATE)
      console.error('Create task error:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm(CONFIG.MESSAGES.CONFIRM_DELETE)) {
      return
    }

    try {
      await TaskAPI.deleteTask(taskId)
      setSuccess(CONFIG.MESSAGES.SUCCESS_DELETE)
      setError(null)
      await loadTasks()
    } catch (err) {
      setError(CONFIG.MESSAGES.ERROR_DELETE)
      console.error('Delete task error:', err)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">📝 Todo List Manager</h1>
        <p className="subtitle">Kelola tugas Anda dengan mudah</p>
      </header>

      <section className="form-section">
        <h2 className="section-title">Buat Tugas Baru</h2>
        <TaskForm onSubmit={handleCreateTask} />
      </section>

      <section className="tasks-section">
        <div className="tasks-header">
          <h2 className="section-title">Daftar Tugas</h2>
          <button className="btn btn-secondary" onClick={loadTasks}>
            <span className="btn-icon">🔄</span>
            Refresh
          </button>
        </div>

        {error && <Message type="error" message={error} onClose={() => setError(null)} />}
        {success && <Message type="success" message={success} onClose={() => setSuccess(null)} />}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Memuat data...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>Belum ada tugas</p>
            <small>Buat tugas baru untuk memulai</small>
          </div>
        ) : (
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        )}
      </section>
    </div>
  )
}

export default App
