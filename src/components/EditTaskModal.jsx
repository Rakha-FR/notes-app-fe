import React, { useState, useEffect } from 'react'

function EditTaskModal({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Judul tugas tidak boleh kosong')
      return
    }

    onSubmit({
      title: title.trim(),
      description: description.trim()
    })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Tugas</h2>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Judul Tugas *</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul tugas..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Deskripsi</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi tugas (opsional)..."
              rows="3"
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <span className="btn-icon">💾</span>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskModal
