import axios from 'axios';
import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/tasks';

// const initialTasks = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const taskApiToJson = (task) => {
  const {description, id, is_complete: isComplete, title} = task;
  return {description, id, isComplete, title};
};

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/tasks`)
      .then((response) => {
        const tasksFromApi = response.data.map(taskApiToJson);
        setTasks(tasksFromApi);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
      });
  }, []);

  const toggleTaskComplete = (id) => {
    // copy state of `tasks` into a new variable which can be changed and set as new/updated state of `tasks`
    const newStateOfTasks = [...tasks];
    // array.find( anonymous arrow function which returns `true` or `false` for each item in the array )
    const indexOfTaskToAlter = newStateOfTasks.findIndex((task) => id === task.id);
    // toggle the boolean state of the relevant task's `isComplete` property
    newStateOfTasks[indexOfTaskToAlter].isComplete = !newStateOfTasks[indexOfTaskToAlter].isComplete;
    // actually change `tasks`
    setTasks(newStateOfTasks);
  };

  const deleteTask = (id) => {
    axios.delete(`${API_BASE_URL}/${id}`)
      .then(() => {
        // Remove task from local state after successful deletion
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => {
        console.error('Error deleting task:', err);
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
