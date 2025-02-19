import './Editor.css';
import { useState, useRef, useContext } from 'react';
import { TodoDispatchContext } from '../App';
const Editor = () => {
  const {onCreate} = useContext(TodoDispatchContext);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const onChangeContent = (e) => {
      setContent(e.target.value);
  };

  const onKeydown = (e) =>{
    if(e.keyCode === 13){
      onSubmit();
    }
  }
  
  const onSubmit = () => {
    if(content === ''){
      contentRef.current.focus();
      return;//강제 종료
    }
    onCreate(content);
    setContent('');//초기화
  };

  return (
    <div className="Editor">
      <input 
        ref={contentRef}
        onKeyDown={onKeydown}
        value={content}
        onChange={onChangeContent}
        type="text" 
        placeholder="오늘 할 일 입력하기💬"
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  )
}

export default Editor;