import React, { useState, useEffect } from 'react'
import CONFIG from './config'
import TaskAPI from './api'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskCard from './components/TaskCard'
import Message from './components/Message'
import EditTaskModal from './components/EditTaskModal'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [searchId, setSearchId] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchedTask, setSearchedTask] = useState(null)

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

  const handleSearchById = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!searchId) return

    try {
      setSearchLoading(true)
      setError(null)
      setSearchedTask(null)
      const result = await TaskAPI.getTaskById(searchId)
      if (!result) {
        setError('Tugas dengan ID tersebut tidak ditemukan.')
      } else {
        setSearchedTask(result)
      }
    } catch (err) {
      setError(CONFIG.MESSAGES.ERROR_NETWORK)
      console.error('Search by id error:', err)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleClearSearch = () => {
    setSearchId('')
    setSearchedTask(null)
    setError(null)
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

  const handleEditTask = (task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = async (taskData) => {
    try {
      await TaskAPI.updateTask(editingTask.id, taskData)
      setSuccess(CONFIG.MESSAGES.SUCCESS_UPDATE)
      setError(null)
      setEditingTask(null)
      await loadTasks()
    } catch (err) {
      setError(CONFIG.MESSAGES.ERROR_UPDATE)
      console.error('Update task error:', err)
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
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={loadTasks}>
              <span className="btn-icon">🔄</span>
              Refresh
            </button>

            <form className="search-form" onSubmit={handleSearchById}>
              <input
                className="search-input"
                type="text"
                placeholder="Cari tugas berdasarkan ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                {searchLoading ? 'Mencari...' : 'Cari'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClearSearch}>
                Clear
              </button>
            </form>
          </div>
        </div>

        {error && <Message type="error" message={error} onClose={() => setError(null)} />}
        {success && <Message type="success" message={success} onClose={() => setSuccess(null)} />}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Memuat data...</p>
          </div>
        ) : searchedTask ? (
          <div className="search-result">
            <h3>Hasil Pencarian</h3>
            <TaskCard task={searchedTask} onEdit={handleEditTask} onDelete={handleDeleteTask} />
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>Belum ada tugas</p>
            <small>Buat tugas baru untuk memulai</small>
          </div>
        ) : (
          <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        )}
      </section>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}

export default App
