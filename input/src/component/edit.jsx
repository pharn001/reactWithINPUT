import React from 'react'

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
function Edit() {
  return (
    
    <div>
      {editNoteElement}
    </div>
  )
}

export default Edit
