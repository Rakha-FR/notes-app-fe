import React from 'react'
import TaskCard from './TaskCard'

function TaskList({ tasks, onDelete }) {
  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TaskList
