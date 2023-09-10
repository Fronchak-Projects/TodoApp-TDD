import Todo from "../../types/Todo";
import './index.css';

type Props = {
    todo: Todo,
    onChange: (id: number) => void,
    onDelete: (id: number) => void
}

const TodoItem = ({ todo, onChange, onDelete }: Props) => {

    return (
        <div data-testid="todo-item" className="todo-item-container mb-3 px-2">
            <input 
                type="checkbox"
                className="form-check-input mt-0"
                defaultChecked={ todo.done }
                onChange={() => onChange(todo.id)}
            />
            <span
                className={`flex-1 ${todo.done && 'line-through'}`}
            >{ todo.description }</span>
            <i 
            onClick={() => onDelete(todo.id)}
            className="bi bi-trash-fill text-danger" data-testid="trash-icon"></i>
        </div>
    );
}

export default TodoItem;