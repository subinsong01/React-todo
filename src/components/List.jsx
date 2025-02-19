import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoContext } from '../App';
const List= () => {
  const {todos} = useContext(TodoContext);
  const [search, setSearch] = useState('');
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const getFilteredData = () => {
    if(search === '') {
      return todos;
    }
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
  }

  const filteredTodos = getFilteredData();

  const {totalCount, doneCount, notDoneCount} = useMemo(() => {
    console.log("getAnalyedData 호출!");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);//callback함수, 배열(의존성: deps)


  //const {totalCount, doneCount, notDoneCount} = getAnalyzedData();

  return (
    <div className='List'>
      <h4>Todo List🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input value={search} onChange={onChangeSearch} placeholder='검색어를 입력해주세요'/>
      <div className='todos_wrapper'>
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo}/>
        })} 
      </div>
    </div>
  )
}

export default List;