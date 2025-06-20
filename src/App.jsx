import axios from 'axios';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:5000/tasks'; // Laura flask server
// const API_BASE_URL = 'http://localhost:5000/tasks';

const taskApiToJson = (task) => {
  const {description, id, is_complete: isComplete, title} = task;
  return {description, id, isComplete, title};
};

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}`)
      .then((response) => {
        // console.log(response.data);
        const tasksFromApi = response.data.map(taskApiToJson);
        setTasks(tasksFromApi);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
      });
  }, []);

  const toggleTaskComplete = (id) => {
    // array.find( anonymous arrow function which returns `true` or `false` for each item in the array )
    const indexOfTaskToAlter = tasks.findIndex((task) => id === task.id);

    axios.patch(`${API_BASE_URL}/${id}/${tasks[indexOfTaskToAlter].isComplete ? 'mark_incomplete' : 'mark_complete'}`)
      .then(() => {
      // copy state of `tasks` into a new variable which can be changed and set as new/updated state of `tasks`
        const newStateOfTasks = [...tasks];
        // toggle the boolean state of the relevant task's `isComplete` property
        newStateOfTasks[indexOfTaskToAlter].isComplete = !newStateOfTasks[indexOfTaskToAlter].isComplete;
        // actually change `tasks`
        setTasks(newStateOfTasks);
      })
      .catch(err => {
        console.error('Error marking task complete:', err);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_BASE_URL}/${id}`)
      .then(() => {
      // Remove task from local state after successful deletion
        const allTasksMinusDeletedTask = tasks.filter(task => task.id !== id);
        setTasks(allTasksMinusDeletedTask);
      })
      .catch(err => {
        console.error('Error deleting task:', err);
      });
  };

  const addTask = (taskData) => {
    axios.post(API_BASE_URL, taskData)
      .then((response) => {
        // const updatedTasks = [...tasks, taskApiToJson(response.data)];
        // console.log('This is inside the post req');
        // console.log(updatedTasks);
        // setTasks(updatedTasks);
        setTasks((tasks) => {
          return [...tasks, taskApiToJson(response.data)];
        });
      })
      .catch(err => {
        console.error('Error adding task:', err);
      });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm
          onTaskSubmit={addTask}
        />

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
