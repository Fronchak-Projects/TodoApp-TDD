import { useState, useRef } from 'react';
import TodoForm from "../TodoForm";
import Todo from '../../types/Todo';
import TodosContainer from '../TodosContainer';
import './index.css';

const TodoApp = () => {

    const [todos, setTodos] = useState<Array<Todo>>([]);
    const nextId = useRef<number>(1);

    const addTodo = (description: string) => {
        const nextTodos: Array<Todo> = [
            ...todos,
            {
                id: nextId.current,
                description,
                done: false
            }
        ];
        nextId.current++;
        setTodos(nextTodos);
    }

    const switchStatus = (id: number) => {
        const nextTodos = todos.map((todo) => {
            if(todo.id !== id) return todo;
            return {
                ...todo,
                done: !todo.done
            }
        });
        setTodos(nextTodos);
    }

    const removeTodo = (id: number) => {
        const nextTodos = todos.filter((todo) => todo.id !== id);
        setTodos(nextTodos);
    }

    return (
        <div id="todo-container">
            <h1 className='font-bold mb-3'>Todo App</h1>
            <div className='mb-3'>
                <TodoForm onSubmit={addTodo} />
            </div>
            { todos.length === 0 ? (
                <p className='text-center'>You don't have any todo registered</p>
            ) : (
                <TodosContainer todos={todos} onChange={switchStatus} onDelete={removeTodo} />
            ) }
        </div>
    )
}

export default TodoApp;