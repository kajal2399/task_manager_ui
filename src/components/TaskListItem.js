import React from 'react';

const TaskListItem = ({ task }) => {
   return (
    <div className="container">
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <span>Status: {task.status}</span>
            </div>
            <button 
              onClick={() => onDeleteTask(task.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskListItem;
