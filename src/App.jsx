import axios from 'axios';
import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';

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
    // copy state of `tasks` into a new variable which can be changed and set as new/updated state of `tasks`
    const newStateOfTasks = [...tasks];

    // array.find( anonymous arrow function which returns `true` or `false` for each item in the array )
    const indexOfTaskToAlter = newStateOfTasks.findIndex((task) => id === task.id);

    // remove the indicated task from new/updated state of `tasks`
    newStateOfTasks.splice(indexOfTaskToAlter, 1);

    // actually change `tasks`
    setTasks(newStateOfTasks);
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
