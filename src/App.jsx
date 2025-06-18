import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios, { all } from 'axios';

const baseUrl = 'http://127.0.0.1:5000';

const initialTasks = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const convertFromApi = (task) => {
    const { id, title, description, is_complete: isComplete } = task;
    return {id, title, description, isComplete};
  };

  const getAllTasksApi = () => {
    return axios.get(`${baseUrl}/tasks`)
      .then(response => {
        return response.data.map(convertFromApi);
      })
      .catch(error => {
        console.error('Error getting tasks:', error);
        throw error;
      });
  };
  useEffect(() => {
    const allTasks = getAllTasksApi();
    return setTasks((tasks) => tasks);
  }, [getAllTasksApi, tasks]);

  const toggleTaskComplete = (id) => {
    setTasks(tasks => {
      return tasks.map( task => {
        if(task.id === id){
          task.isComplete = !task.isComplete;
        }
        return task;
      });
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks => {
      return tasks.filter(task => {
        return task.id !== id;
      });
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          allTasks={tasks}
          onToggleTask={toggleTaskComplete}
          onDeleteTask={deleteTask}
        />

      </main>
    </div>
  );
};

export default App;
