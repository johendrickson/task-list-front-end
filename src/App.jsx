import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

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

  console.log('hopefully Laura will see this');
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
