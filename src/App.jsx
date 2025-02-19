import './App.css';
import { useRef, useReducer, useCallback, createContext, useMemo } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime()
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime()
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime()
  }
];
function reducer(state, action){
  switch(action.type){
    case 'CREATE' : 
      return [action.date, ...state];
    case 'UPDATE' : 
      return state.map((item) => item.id === action.targetId? {...item, isDone:!item.isDone} : item);
    case 'DELETE' : 
      return state.filter((item) => item.id!== action.targetId);
    default:
      return state;
  }
}

export const TodoStateContext = createContext();//일반적으로 함수 ��에서 생성
export const TodoDispatchContext = createContext();//일반적으로 함수 밖에서 생성
function App() {

  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime()
      },
    });
  }, []) ;

  const onUpdate = useCallback((targetId) => {
    //todos State의 값들 중에
    //targetId와 일치하는 id를 갖는 투구 아이텡믜 isDone 변경 
    dispatch({
      type: "UPDATE",
      targetId: targetId
    })
  }, []);

  const onDelete = useCallback((targetId) =>{
    //인수로는 todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    dispatch({
      type: "DELETE",
      targetId: targetId
    })
  }, []); //최초 한번만 리랜더링

  const memoizedDispatch = useMemo(() => {
    return {onCreate, onDelete, onUpdate};
  }, []);

  return (
    <div className='App'>
      <Header /> 
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
        <Editor onCreate={onCreate} />
        <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App
