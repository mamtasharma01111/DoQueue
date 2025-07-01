import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  status: 'assigned' | 'inProgress' | 'completed';
 
}

const AdminDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('/api/admin/tasks', { withCredentials: true }).then(res => {
      setTasks(res.data);
    });
  }, []);

  const statusCount = {
    assigned: tasks.filter(t => t.status === 'assigned').length,
    inProgress: tasks.filter(t => t.status === 'inProgress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="dashboard">
      <h2>Task Overview</h2>
      <div className="task-stats">
        <p>Assigned: {statusCount.assigned}</p>
        <p>In Progress: {statusCount.inProgress}</p>
        <p>Completed: {statusCount.completed}</p>
      </div>

      <h3>Active Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - <strong>{task.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
