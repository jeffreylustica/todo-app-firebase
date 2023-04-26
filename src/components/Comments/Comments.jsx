import { useState, useRef } from 'react'
import './Comments.scss'
import { HiTrash, HiPencilAlt, HiCheck } from 'react-icons/hi'

const Comments = ({comment, handleDeleteComment, index, setCommentEditMode, handleUpdateComment}) => {
    const [updatedComment, setUpdatedComment] = useState('')
    const [isEditMode, setIsEditMode] = useState(false)

    const inputRef = useRef(null)

    const handleEditComment = () => {
        if (isEditMode) {
            setCommentEditMode(false)
            setIsEditMode(false)
            handleUpdateComment(updatedComment, index)
        } else {
            setCommentEditMode(true)
            setIsEditMode(true)
            setUpdatedComment(comment)
            inputRef.current.focus()
        }
    }

  return (
    <div className="todo-comments__comment">
        {!isEditMode ? (
            <p
                ref={inputRef}
                className='todo-comments__text'
            >
                {comment}
            </p>
        ) : (
            <input
                ref={inputRef}
                className='todo-comments__text edit-mode'
                onChange={(e) => setUpdatedComment(e.target.value)}
                value = {updatedComment}
            />
        )}

        <button 
            className='todo-comments__edit' 
            onClick={() => handleEditComment(index)}
        >
            {isEditMode? <HiCheck /> : <HiPencilAlt />} 
        </button>
        <button 
            className='todo-comments__delete' 
            onClick={() => handleDeleteComment(index)}
        >
                <HiTrash />
        </button>
    </div>
  )
}

export default Comments