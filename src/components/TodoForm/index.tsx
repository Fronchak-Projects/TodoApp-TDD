import { useState } from 'react';
import './index.css';

type Props = {
    onSubmit: (newTodo: string) => void
}

const TodoForm = ({ onSubmit }: Props) => {

    const [newTodo, setNewTodo] = useState<string>('');
    const [wasSubmited, setWasSubmited] = useState<boolean>(false);

    const newTodoIsBlank = newTodo.trim().length === 0;

    const errorMessage = (wasSubmited && newTodoIsBlank) ? `Todo's description is required` : ''

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWasSubmited(true);
        if(newTodoIsBlank) return;

        onSubmit(newTodo);
        setNewTodo('');
        setWasSubmited(false);
    }

    return (
        <>
        <form onSubmit={(e) => handleSubmit(e)} id="todo-form" className='w-100'>
            <div id="input-container">
                <label htmlFor="new-todo" className='form-label d-none'>Todo</label>
                <input 
                    type="text"
                    id="new-todo"
                    className={`form-control ${errorMessage && 'is-invalid'}`}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />

            </div>
            <button type='submit' className='btn btn-primary'>ADD</button>
        </form>
        <div className="invalid-feedback d-block">
            { errorMessage }
        </div>        
        </>

    );
}

export default TodoForm;