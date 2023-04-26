import { useState } from 'react'
import './EditForm.scss'
import { HiCheck } from 'react-icons/hi'

const EditForm = ({editedTodo, updateTodo, setIsEditting}) => {
    const [updatedTodo, setUpdatedTodo] = useState(editedTodo)
    const handleSubmit = (e) => {
        e.preventDefault()
        const path = 'todos'
        updateTodo(updatedTodo, path, 'text')
        setIsEditting(false)
    }

    const handleChange = (todoValue) => {
        setUpdatedTodo(prevValue => ({...prevValue, text: todoValue}))
    }

    return (
        <div onSubmit={handleSubmit} className='edit-form'>
            <form className="edit-form__form">
                <input 
                    onChange={(e) => handleChange(e.target.value)}
                    value={updatedTodo.text}
                    className='edit-form__input' 
                    type="text" 
                    required 
                    autoFocus
                />
                <button className='edit-form__submit' type='submit'><HiCheck /></button>
            </form>
        </div>
    )
}

export default EditForm