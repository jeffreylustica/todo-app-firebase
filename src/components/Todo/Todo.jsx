import './Todo.scss'
import { useState } from 'react'
import { HiTrash, HiPencilAlt, HiChatAlt, HiPlus } from 'react-icons/hi'
import Comments from '../Comments/Comments'

const Todo = ({todo, actions, setEditMode}) => {
    const {deleteTodo, updateTodo, updateComment} = actions
    
    const [toggleComments, setToggleComments] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [commentEditMode, setCommentEditMode] = useState(false)

    const handleDeleteTodo = (todo) => {
        const path = 'todos'
        deleteTodo(todo, path)
    }

    const handleUpdateTodo = (todo) => {
        const path = 'todos'
        updateTodo(todo, path, 'isCompleted')
    }

    const handleToggleComment = () => {
        setToggleComments(prevState => !prevState)
    }

    const handleAddComment = (e) => {
        e.preventDefault()
        const newCommentsArr = [...todo.comments, newComment]
        const path = 'todos'
        updateComment(newCommentsArr, todo, path)
        setNewComment('')
    }

    const handleUpdateComment = (updatedComment, index) => {
        const newCommentsArr = todo.comments.map((comment, i) => (
            i === index ? updatedComment : comment
        ))
        const path = 'todos'
        updateComment(newCommentsArr, todo, path)
    }

    const handleDeleteComment = (index) => {
        const newCommentsArr = todo.comments.filter((item, i) => index !== i)
        const path = 'todos'
        updateComment(newCommentsArr, todo, path)
    }
    
    return (
        <>
            <li className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
                <input onChange={() => handleUpdateTodo(todo)} className='todo__checkbox' type="checkbox" checked={todo.isCompleted ? 'checked' : ''} />
                <p className={`todo__text ${todo.isCompleted ? 'checked' : ''}`}>{todo.text}</p>
                <button className='todo__edit' onClick={() => setEditMode(todo)}><HiPencilAlt /></button>
                <button className='todo__comment' onClick={() => handleToggleComment()} ><HiChatAlt /></button>
                <button className='todo__delete' onClick={() => handleDeleteTodo(todo)}><HiTrash /></button>
            </li>

            {toggleComments && (
                <div className='todo-comments'>
                    {todo.comments.map((comment, index) => (
                        <Comments 
                            key={`${comment}${index}`}
                            comment={comment} 
                            handleDeleteComment = {handleDeleteComment}
                            index = {index}
                            setCommentEditMode={setCommentEditMode}
                            handleUpdateComment = {handleUpdateComment}
                        />
                    ))}
                    {!commentEditMode && (
                        <form className='todo-comments__form' onSubmit={handleAddComment}>
                            <input type="text"
                                className='todo-comments__form__new-comment' 
                                required 
                                onChange={(e) => setNewComment(e.target.value)}
                                value={newComment}
                            />
                            <button  type='submit' className='todo-comments__form__submit-btn'><HiPlus /></button>
                        </form>
                    )}  
                </div>
            )}
        </>
    )
}

export default Todo