import { useState } from 'react';
import PropTypes from 'prop-types';

const newTask = {
  title: '',
  description: ''
};
const NewTaskForm = ({ addTask }) => {
  const [taskData, setTaskData] = useState({});
  const handleChange = (event) => {
    preventDefault();
    const value = event.target.value;
    return value;
  };
  const onSubmit = (event) =>{
    preventDefault();
    // Placeholder for addTask
  }
  return (
    <form typeof='submit'>
      <label htmlFor='title'>New Task: </label>
      <input
        type="text"
        id={taskDate.id} />
        id={taskDate.title} />
        onChange={handleChange} />
    </form>

  // wrapper - form type =submit
  // a label, and input for title
  // a label and input for description
  // each includes following attributes: htmlFor, name, value, onChange
  // button to submit, attribute: onSubmit
  );
};

// NewTaskForm.propTypes = {
//   needs function name : PropTypes.func.isRequired,
// };

export default NewStudentForm;