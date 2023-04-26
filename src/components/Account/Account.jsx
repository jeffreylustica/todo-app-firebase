import { useEffect, useState } from 'react'
import './Account.scss'
import CustomForm from '../CustomForm/CustomForm'
import LogOut from '../Logout/LogOut'
import Todo from '../Todo/Todo'
import { db } from '../../firebase'
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext'
import EditForm from '../EditForm/EditForm'

const Account = () => {
  const [todos, setTodos] = useState([])
  const { user } = UserAuth()
  const [isEditting, setIsEditting] = useState(false)
  const [editedTodo, setEditedTodo] = useState(null)

  const todoCollRef = collection(db, `users/${user.uid}/todos`)

  useEffect(() => {
    getTodos()
  }, [user])

  const getTodos = async () => {
    try {
      const data = await getDocs(todoCollRef)
      const filteredData = data.docs.map(doc => (
        {...doc.data(), id: doc.id}
      ))
      setTodos(filteredData)     
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async (todo) => {
    try {
      await setDoc(doc(todoCollRef), todo)
      getTodos()
    } catch (error) {
      console.log(error)
    }
  } 

  const updateTodo = async(todo, docPath, property) => {
    const newValue = property === 'text' ? {text: todo.text} : {isCompleted: !todo.isCompleted}
    try {
      await updateDoc(doc(db, `users/${user.uid}/${docPath}/${todo.id}`), newValue)
      getTodos()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async(todo, docPath) => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/${docPath}/${todo.id}`))
      getTodos()
    } catch (error) {
      console.log(error)
    }
  }

  const setEditMode = (todo) => {
    setIsEditting(true)
    setEditedTodo(todo)
  }

  const updateComment = async (commentArr, todo, docPath) => {
    try {
      await updateDoc(doc(db, `users/${user.uid}/${docPath}/${todo.id}`), {comments: commentArr})
      getTodos()
    } catch (error) {
      console.log(error)
    }
  } 
  
  return (
    <div className='account'>
      {isEditting && (
        <EditForm 
          editedTodo={editedTodo} 
          updateTodo={updateTodo} 
          setIsEditting= {setIsEditting}
        />
      )}
      <div className="account__wrapper">
        <div className='account__info'>
          <div className='account__user-email'>
            User: {user?.email}
          </div>
          <LogOut />
        </div>
        <h2 className='account__header'>Todo List</h2>
        <CustomForm addTodo={addTodo} path='' />
        <ul className='account__todo-list'>
          {todos.map(todo => {
            return <Todo 
            key={todo.id} 
            todo={todo} 
            actions = {{updateTodo, deleteTodo, updateComment}}
            setEditMode = {setEditMode}
          />
          })}
        </ul>
      </div>
    </div>
  )
}

export default Account