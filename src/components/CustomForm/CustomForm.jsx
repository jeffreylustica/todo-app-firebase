import { useState } from 'react'
import './CustomForm.scss'
import { HiPlus } from 'react-icons/hi'

const CustomForm = ({addTodo}) => {
    const [todoItem, setTodoItem] = useState({
        text: '',
        isCompleted: false,
        comments: []
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo(todoItem)
        setTodoItem(prevTodo => ({...prevTodo, text: ''}))
    }

    const handleChange = (todoText) => {
        setTodoItem(prevItem => ({...prevItem, text: todoText}))
    }
    
    return (
        <form onSubmit={handleSubmit} className="custom-form">
            <input 
            onChange={(e) => handleChange(e.target.value)}
            value={todoItem.text}
            className='custom-form__input' 
            type="text" 
            placeholder='input task' 
            required 
            autoFocus
        />
            <button className='custom-form__submit' type='submit'><HiPlus /></button>
        </form>
    )
}

export default CustomForm