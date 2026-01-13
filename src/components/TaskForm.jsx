import React, { useRef } from 'react'

function TaskForm({ onSubmit }) {
  const formRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const title = titleRef.current.value.trim()
    const description = descriptionRef.current.value.trim()

    if (!title) {
      alert('Judul tugas tidak boleh kosong')
      return
    }

    try {
      await onSubmit({
        title,
        description
      })
      formRef.current.reset()
      titleRef.current.focus()
    } catch (err) {
      console.error('Form submit error:', err)
    }
  }

  return (
    <form ref={formRef} className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Judul Tugas *</label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          name="title"
          placeholder="Masukkan judul tugas..."
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Deskripsi</label>
        <textarea
          ref={descriptionRef}
          id="description"
          name="description"
          placeholder="Masukkan deskripsi tugas (opsional)..."
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        <span className="btn-icon">➕</span>
        Tambah Tugas
      </button>
    </form>
  )
}

export default TaskForm
