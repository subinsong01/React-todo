import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../App';
const TodoItem = ({id, isDone, content, date}) => {
  const {onUpdate, onDelete} = useContext(TodoDispatchContext);
  
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

//export default memo(TodoItem, (prevProps, nextProps) => {
  //반환값에 따라, Props가 바뀌었는지 안 바뀌었는지 판단
  // T -> Props가 바뀌지 않음 -> 리랜더링 X
  // F -> Props가 바뀜 -> 리랜더링 O
  //if(prevProps.id !== nextProps.id) return false;
  //if(prevProps.isDone!== nextProps.isDone) return false;
  //if(prevProps.content!== nextProps.content) return false;
  //if(prevProps.date!== nextProps.date) return false;

  //return true;
//});//콜백함수를 커스텀해줌
export default memo(TodoItem);