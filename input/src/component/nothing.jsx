import React, { useState } from 'react';
import "./stly.css"

function Nothing() {
  // สร้าง state สำหรับเก็บข้อมูลบันทึก
  const [count, setCount] = useState({ content: '', author: '' });
  const [allNotes, setAllNotes] = useState([]);
  const [editNotes, setEditNotes] = useState(null);

  // เมื่อมีการเปลี่ยนแปลงค่าในช่องกรอกข้อมูลบันทึก
  function onNoteValueChange(event) {
    const { name, value } = event.target;
    setCount((prevCount) => ({
      ...prevCount,
      [name]: value
    }));
  }

  // เมื่อมีการเปลี่ยนแปลงค่าในช่องกรอกข้อมูลบันทึกที่กำลังแก้ไข
  function onEditNoteValueChange(event) {
    const { name, value } = event.target;
    setEditNotes((prevEditNotes) => ({
      ...prevEditNotes,
      [name]: value
    }));
  }

  // เพิ่มบันทึกใหม่
  function onNoteSubmit(event) {
    event.preventDefault();
    const newNote = { ...count, id: Date.now().toString() };
    setAllNotes([newNote, ...allNotes]);
    setCount({ content: '', author: '' });
  }

  // แก้ไขบันทึก
  function onSubmitEditNotes(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) =>
      prevAllNotes.map((note) =>
        note.id !== editNotes.id ? note : editNotes
      )
    );
    setEditNotes(null);
  }

  // ลบบันทึก
  function onDelete(noteId) {
    setAllNotes((prevAllNotes) =>
      prevAllNotes.filter((note) => note.id !== noteId)
    );
  }

  // สร้าง JSX elements สำหรับแสดงบันทึกทั้งหมด
  const noteElements = allNotes.map((note) => (
    <div key={note.id} className='app-notes'>
      <p>{note.content}</p>
      <h5>{note.author}</h5>
      <p>
        <a className='a' onClick={() => setEditNotes(note)}>Edit</a>
        <span>|</span>
        <a className='b' onClick={() => onDelete(note.id)}>Delete</a>
      </p>
    </div>
  ));

  // สร้าง JSX element สำหรับแก้ไขบันทึก
  let editNoteElement = null;
  if (editNotes) {
    editNoteElement = (
      <div className="edit-note">
        <form onSubmit={onSubmitEditNotes}>
          <label>Content</label>
          <input
            type="text"
            placeholder='Enter content'
            name="content"
            value={editNotes.content}
            onChange={onEditNoteValueChange}
          />
          <label>Author</label>
          <input
            type='text'
            placeholder='Enter author'
            name='author'
            value={editNotes.author}
            onChange={onEditNoteValueChange}
          />
          <button type='submit'>Save changes</button>
        </form>
      </div>
    );
  }

  // ส่งคืน JSX elements สำหรับแสดงและแก้ไขบันทึก
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
            <hr />
            <button type='submit'>Add nothing</button>
          </form>
          <div className='app-notes'>
            {noteElements}
          </div>
        </div>
      </section>
      {editNoteElement}
    </div>
  );
}

export default Nothing;
