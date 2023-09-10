import { render, screen, act, getByTestId, getByRole } from "@testing-library/react";
import TodoApp from "..";
import userEvent from "@testing-library/user-event";

describe('TodoApp', () => {

    test('should render correctly', () => {
        render(<TodoApp />);

        expect(screen.getByText('Todo App')).toBeInTheDocument();
        expect(screen.getByText('ADD')).toBeInTheDocument();
        expect(screen.getByLabelText('Todo')).toBeInTheDocument();
        expect(screen.getByText(`You don't have any todo registered`)).toBeInTheDocument();
    });

    test('should add first todo to the list and remove mensagem with no todo', () => {
        render(<TodoApp />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'Go to the gym');
            userEvent.click(button);
        });

        expect(screen.queryByText(`You don't have any todo registered`)).toBeNull();
        const span = screen.getByText('Go to the gym');
        expect(span).toBeInTheDocument();
        expect(span.classList.contains('line-through')).toBeFalsy();
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBeFalsy();
        expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
    });

    test('should switch todo as done or not done when checkbox in clicked', () => {
        render(<TodoApp />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'Go to the gym');
            userEvent.click(button);
        });

        const span = screen.getByText('Go to the gym');
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

        act(() => {
            userEvent.click(checkbox);
        });

        expect(span).toBeInTheDocument();
        expect(span.classList.contains('line-through')).toBeTruthy();
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBeTruthy();

        act(() => {
            userEvent.click(checkbox);
        });

        expect(span).toBeInTheDocument();
        expect(span.classList.contains('line-through')).toBeFalsy();
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBeFalsy();
    });

    test('should remove todo when click in the icon', () => {
        render(<TodoApp />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'Go to the gym');
            userEvent.click(button);
        });

        const icon = screen.getByTestId('trash-icon');

        act(() => {
            userEvent.click(icon);
        });

        expect(screen.getByText(`You don't have any todo registered`)).toBeInTheDocument();
        expect(screen.queryByText('Go to the gym')).toBeNull();
        expect(screen.queryByRole('checkbox')).toBeNull();
        expect(screen.queryByTestId('trash-icon')).toBeNull();
    });

    test('should only remove the todo from the icon been clicked', () => {
        render(<TodoApp />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'First task');
            userEvent.click(button);
            userEvent.type(input, 'Second task');
            userEvent.click(button);
        });

        const todoItems = screen.getAllByTestId('todo-item');
        const secondTaskTodo = todoItems.find((el) => el.textContent?.includes('Second task'))!;
        const secondTaskIcon = getByTestId(secondTaskTodo, 'trash-icon');
        
        act(() => {
            userEvent.click(secondTaskIcon);
        });

        expect(screen.queryByText('Second task')).toBeNull();
        expect(screen.getByText('First task')).toBeInTheDocument();
    });

    test('should only switch the status of the todo from the checkbox been clicked', () => {
        render(<TodoApp />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'First task');
            userEvent.click(button);
            userEvent.type(input, 'Second task');
            userEvent.click(button);
        });

        const todoItems = screen.getAllByTestId('todo-item');
        const firstTaskTodo = todoItems.find((el) => el.textContent?.includes('First task'))!;
        const secondTaskTodo = todoItems.find((el) => el.textContent?.includes('Second task'))!;

        expect(firstTaskTodo).toBeInTheDocument();
        expect(secondTaskTodo).toBeInTheDocument();

        const firstTaskCheckbox = getByRole(firstTaskTodo, 'checkbox') as HTMLInputElement;
        const secondTaskCheckbox = getByRole(secondTaskTodo, 'checkbox') as HTMLInputElement;

        expect(firstTaskCheckbox.checked).toBeFalsy();
        expect(secondTaskCheckbox.checked).toBeFalsy();

        act(() => {
            userEvent.click(secondTaskCheckbox);
        });

        expect(firstTaskCheckbox.checked).toBeFalsy();
        expect(secondTaskCheckbox.checked).toBeTruthy();
    });
});