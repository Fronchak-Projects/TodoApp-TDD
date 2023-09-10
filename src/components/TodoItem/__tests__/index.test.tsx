import { render, screen } from "@testing-library/react";
import Todo from "../../../types/Todo";
import TodoItem from "..";
import userEvent from "@testing-library/user-event";

describe('TodoItem', () => {

    test('should render correctly when todo is done', () => {
        const todo: Todo = {
            id: 1, description: 'Study', done: true
        }
        render(<TodoItem todo={todo} onChange={jest.fn()} onDelete={jest.fn()} />);

        const span = screen.getByText('Study');
        expect(span).toBeInTheDocument();
        expect(span.classList.contains('line-through')).toBeTruthy();
        expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBeTruthy();
    });

    test('should render correctly when todo is not done', () => {
        const todo: Todo = {
            id: 1, description: 'Study', done: false
        }
        render(<TodoItem todo={todo} onChange={jest.fn()} onDelete={jest.fn()} />);

        const span = screen.getByText('Study');
        expect(span).toBeInTheDocument();
        expect(span.classList.contains('line-through')).toBeFalsy();
        expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBeFalsy();
    });

    test('should call onChange when checkbox in change', () => {
        const onChangeMock = jest.fn();
        const id = 10;
        const todo: Todo = {
            id, description: 'Study', done: false
        }
        render(<TodoItem todo={todo} onChange={onChangeMock} onDelete={jest.fn()} />);

        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(id);
    });

    test('should call onRemove when icon is clicked', () => {
        const onDeleteMock = jest.fn();
        const id = 10;
        const todo: Todo = {
            id, description: 'Study', done: false
        }
        render(<TodoItem todo={todo} onChange={jest.fn()} onDelete={onDeleteMock} />); 

        const icon = screen.getByTestId('trash-icon');
        userEvent.click(icon);

        expect(onDeleteMock).toHaveBeenCalledTimes(1);
        expect(onDeleteMock).toHaveBeenCalledWith(id);
    })
})