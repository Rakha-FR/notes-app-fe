import React from 'react'

function TaskCard({ task, onEdit, onDelete }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return date.toLocaleDateString('id-ID', options)
  }

  return (
    <div className="task-card" data-task-id={task.id}>
      <div className="task-header">
        <div className="task-info">
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-description">{task.description}</p>}
        </div>
        <div className="task-actions">
          <button
            className="btn btn-edit"
            onClick={() => onEdit(task)}
            title="Edit tugas"
          >
            <span className="btn-icon">✏️</span>
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onDelete(task.id)}
            title="Hapus tugas"
          >
            <span className="btn-icon">🗑️</span>
            Hapus
          </button>
        </div>
      </div>
      <div className="task-meta">
        <div className="task-meta-item">
          <span>🆔</span>
          <span>ID: {task.id}</span>
        </div>
        <div className="task-meta-item">
          <span>📅</span>
          <span>{formatDate(task.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
