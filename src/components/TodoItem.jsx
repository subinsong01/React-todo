import './TodoItem.css';
const TodoItem = ({id, isDone, content, date, onUpdate, onDelete}) => {

  const onChangeCheckbox = () => {
    onUpdate(id);
  }
  const onClickDelete = () => {
    onDelete(id);
  }

  return(
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} readOnly checked={isDone} type='checkbox' />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}날짜</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  )
}

export default TodoItem;