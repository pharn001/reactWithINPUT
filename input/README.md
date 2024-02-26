
// nothing.jsx
import React, { useState } from 'react';
import "./stly.css"

function Nothing() {

  const hide = {
      content:'', 
      author:''
  }
  const [count, setCount] = useState(hide);
  const [allNotes, setAllNotes] = useState([]);
  const [editNotes, setEditNotes] = useState(null);

  function onNoteValueChange(event){
    const {name , value} = event.target;
    setCount((prevCount) => {
      return {
        ...prevCount,
      [name]: value
      }
    });
  }
  function onEditeNote(event){
    const {name , value} = event.target;
    setEditNotes((prevCount) => {
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

 function onNoteSubmit(event){
  event.preventDefault();
  setAllNotes((prevAllNotes) => {
    const newCount = { ...count }
    newCount.id = Date.now().toString();
    return [newCount, ...prevAllNotes];
 })
  setCount(hide);
 }
 function onSubmitEditNotes(event){
  event.preventDefault();

  setAllNotes((prevAllNotes)=>{
     return prevAllNotes.map((theNothing) =>{
        if(theNothing.id !== editNotes.id) return theNothing;
        return editNotes;
        
     })
  })
  setEditNotes(null);
 }
// Map notes to JSX elements
 const noteElements = allNotes.map((theNothing)=>{
  return (
    <div key={theNothing.id} className='app-notes'>
      <p>{theNothing.content}</p>
      <h5>{theNothing.author}</h5>
      <p>
        <a className='a' onClick={()=>{setEditNotes(theNothing)}}>Edit</a>
        <span>|</span>
        <a className='b' onClick={() => {onDelete(theNothing.id)}}>Delete</a>
      </p>
    </div>
  )
 })

let editNoteElement = null;
if(!!editNotes){
  editNoteElement = (
    <div className="edit-note">
        <form onSubmit={onSubmitEditNotes}>
          <label>Content</label>
          <input 
            type="text"
            placeholder='Enter content'
            name="content"
            value={editNotes.content}
           onChange={onEditeNote}
          />
          <label>Author</label>
          <input 
            type='text'
            placeholder='Enter author'
            name='author'
            value={editNotes.author}
           onChange={onEditeNote}
          />   
          <button type='submit'>Add nothing</button>
          </form>
    </div>
  )
}
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
          <button type='submit'>Add nothing</button>
          </form>
        <div className='app-notes'>
         {noteElements}
        </div>

        </div>
      </section>
      {editNoteElement}
    </div>
  )
}

export default Nothing;
