import PropTypes from 'prop-types';
import './Task.css';

const Task = ({id, title, isComplete, onToggleTask, onDeleteTask}) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className='tasks__item'>
      <button
        className={`tasks__item_toggle ${buttonClass}`}
        onClick={() => onToggleTask(id)}
      >
        {title}
      </button>
      <button
        className='tasks__item__remove button'
        onClick={() => onDeleteTask(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
