import React, { useEffect, useState } from 'react'

const Student = () => {
  const [sName, setsName] = useState("")
  const [sAge, setsAge] = useState(0)
  const [students, setstudents] = useState([])
  const [young, setyoung] = useState(null)
  const [avg, setavg] = useState(0)
  const [editMode, setEditMode] = useState(null) // added state to track edit mode

  const addStudent = () => {
    setstudents([...students, { sName, sAge }])

  }

  useEffect(() => {
    console.table(students)

  }, [students])

  useEffect(() => {
    let sum = 0
    students.forEach(stu => sum += stu.sAge)
    setavg(sum / students.length)
  }, [students])

  useEffect(() => {
    if (students.length > 0 && young === null) {
      setyoung(students[0])
    }
    else {
      let temp = students.filter(stu => stu.sAge < young.sAge)[0]
      if (temp) {
        setyoung(temp)
      }
    }
  }, [students])

/////////////////////////       edit                  //////////////////////////////////

const handleEdit = (student) => {
  setEditMode(student) // set student to be edited in edit mode
}

const handleSave = (student) => {
  const updatedStudents = students.map(s => {
    if (s.sName === student.sName && s.sAge === student.sAge) {
      return { sName, sAge }
    }
    return s
  })
  setstudents(updatedStudents) // update students with edited student
  setEditMode(null) // exit edit mode
}

const handleCancel = () => {
  setEditMode(null) // exit edit mode
}
/////////////////////////      finish edit                  //////////////////////////////////
  return (
    <div>
      <h2>Student List</h2><hr></hr>
      sName: <input onChange={(e) => setsName(e.target.value)}></input>&nbsp;
      sAge: <input type={'number'} onChange={(e) => setsAge(+e.target.value)}></input>&nbsp;&nbsp;
      <button onClick={() => addStudent()}>Add</button><br></br><br></br>
      <h3>number of student in the list: {students.length}</h3><br></br>
      <h3>avarge age for the student: {avg} </h3><br></br>
      <h3>the youngest student: {young && young.sAge} </h3><br></br>
      <hr></hr>
      <h2>Student List</h2>
      {students.map((stu, i) => <div key={i}>
      <button onClick={() => setstudents(students.filter(student => student !== stu))}>Delete</button>&nbsp;
        Student name: {stu.sName}&nbsp;
        Student age: {stu.sAge}&nbsp;<br /><br />
      </div>)}<hr></hr>
      {/* form to edit student */}
{editMode && (
  <form>
    sName: <input value={sName} onChange={(e) => setsName(e.target.value)}></input>&nbsp;
    sAge: <input type={'number'} value={sAge} onChange={(e) => setsAge(+e.target.value)}></input>&nbsp;&nbsp;
    <button onClick={() => handleSave(editMode)}>Save</button>
    <button onClick={handleCancel}>Cancel</button>
  </form>
)}

{/* student list */}
{students.map((stu, i) => {
  if (editMode !== stu) { // only render student if not in edit mode
    return (
      <div key={i}>
        Student name: {stu.sName}&nbsp;
        Student age: {stu.sAge}&nbsp;
        <button onClick={() => handleEdit(stu)}>Edit</button>
        <button onClick={() => setstudents(students.filter(student => student !== stu))}>Delete</button>
        <br /><br />
      </div>
    )
  }
})}
    </div>
  )
}

export default Student
// לא הבנתי מה זה null ומתי משתמשמים
