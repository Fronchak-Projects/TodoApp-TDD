import Todo from "../../types/Todo"
import TodoItem from "../TodoItem";

type Props = {
    todos: Array<Todo>,
    onChange: (id: number) => void,
    onDelete: (id: number) => void
}

const TodosContainer = ({ todos, onChange, onDelete }: Props) => {
    return (
        <>
            { todos.map((todo) => (
                <TodoItem 
                    key={todo.id} todo={todo} 
                    onChange={onChange}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
}

export default TodosContainer;