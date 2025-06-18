import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000';

const convertFromApi = (task) => {
  const { id, title, description, is_complete: isComplete } = task;
  return {id, title, description, isComplete};
};

const getAllTasksApi = () => {
  axios.get(`${baseUrl}/tasks`)
    .then(response => {
      const newT = response.data.map(convertFromApi);
      console.log(typeof newT);
      return newT;
    })
    .catch(error => {
      console.error('Error getting tasks:', error);
    });
};
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const newTasks = getAllTasksApi(); // This returns a list of objects, but it's JSON, how do I fix this?
    console.log(newTasks);
    return setTasks(newTasks);
  }, [tasks]);

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
          tasks={tasks}
          onToggleTask={toggleTaskComplete}
          onDeleteTask={deleteTask}
        />

      </main>
    </div>
  );
};

export default App;
