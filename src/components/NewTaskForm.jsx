import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ onTaskSubmit }) => {
  const [taskData, setTaskData] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setTaskData({...taskData, [e.target.value]: e.target.value});
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    onTaskSubmit(taskData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <section className='new-task-form'>
        <label htmlFor='title'>New Task</label>
        <input
          id='title'
          name='title'
          value={taskData.title}
          onChange={handleChange} />
        <label htmlFor='description'>Description</label>
        <input
          id='description'
          name='description'
          value={taskData.description}
          onChange={handleChange} />
        <button type='submit'>⊕</button>
      </section>
    </form>

  );
};

NewTaskForm.propTypes = {
  onTaskSubmit : PropTypes.func.isRequired,
};

export default NewTaskForm;