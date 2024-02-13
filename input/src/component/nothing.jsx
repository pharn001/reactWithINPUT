
// nothing.jsx
import React, { useState } from 'react';
import "../App.css"
function Nothing() {

  const hide = {
      content: '', 
      author:''
  }
  const [count, setCount] = useState(hide);
  function onNoteValueChange(event){
    const {name , value} = event.target;
    setCount((prevCount) => {
      return {
        ...prevCount,
      [name]: value
      }
    });
  }
  function onDelete(NoteId){
    setAllNotes((prevAllNotes) =>{
      return prevAllNotes.filter((theNothing) =>{
        return theNothing.id !== NoteId;
      })
    })
  }
const [allNotes, setAllNotes] = useState([]);

 function onNoteSubmit(event){
  event.preventDefault();
  setAllNotes((prevAllNotes) => {
    const newCount = { ...count }
    newCount.id = Date.now().toString();
    return [newCount, ...prevAllNotes];
 })
  setCount(hide);
 }
// Map notes to JSX elements
 const noteElements = allNotes.map((theNothing)=>{
  return (
    <div key={theNothing.id} className='app-notes'>
      <p>{theNothing.content}</p>
      <h5>{theNothing.author}</h5>
      <p>
        <a>Edit</a>
        <span>|</span>
        <a onClick={() => {onDelete(theNothing.id)}}>Delete</a>
      </p>
    </div>
  )
 })


  return (
    <div className='body'>
      <section className='section-name'>
        <div className='div-name'>
          <form onSubmit={onNoteSubmit}>
          <label>Content</label>
          <input 
            type="text"
            placeholder='Enter content'
            name="content"
            value={count.content}
            onChange={onNoteValueChange}
          />
          <label>Author</label>
          <input 
            type='text'
            placeholder='Enter author'
            name='author'
            value={count.author}
            onChange={onNoteValueChange}
          />        
        <hr/>
          <button type='submit'>Add todo</button>
          </form>
        <div className='app-notes'>
         {noteElements}
        </div>

        </div>
      </section>
    </div>
  )
}

export default Nothing;
