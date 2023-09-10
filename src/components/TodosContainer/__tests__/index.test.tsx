import { render, screen } from "@testing-library/react";
import Todo from "../../../types/Todo";
import TodosContainer from "..";
import userEvent from "@testing-library/user-event";

describe('TodosContainer', () => {

    test('should render all todos', () => {
        const todo1: Todo = {
            id: 1, description: 'Study', done: false
        };
        const todo2: Todo = {
            id: 2, description: 'Eat', done: true
        }
        render(<TodosContainer todos={[todo1, todo2]} onChange={jest.fn()} onDelete={jest.fn()} />);

        expect(screen.getByText('Study')).toBeInTheDocument();
        expect(screen.getByText('Eat')).toBeInTheDocument();
        expect(screen.getAllByTestId('trash-icon').length).toBe(2);
        expect(screen.getAllByRole('checkbox').length).toBe(2);
    });

    test('should call onChange when checkbox is clicked', () => {
        const id = 4;
        const todo1: Todo = {
            id, description: 'Study', done: false
        }; 
        const onChangeMock = jest.fn();

        render(<TodosContainer todos={[todo1]} onChange={onChangeMock} onDelete={jest.fn()} />);

        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenLastCalledWith(id);
    });

    test('should call onDelete when icon is clicked', () => {
        const id = 4;
        const todo1: Todo = {
            id, description: 'Study', done: false
        }; 
        const onDeleteMock = jest.fn();

        render(<TodosContainer todos={[todo1]} onChange={jest.fn()} onDelete={onDeleteMock} />);

        const icon = screen.getByTestId('trash-icon');
        userEvent.click(icon);

        expect(onDeleteMock).toHaveBeenCalledTimes(1);
        expect(onDeleteMock).toHaveBeenLastCalledWith(id);
    })
});