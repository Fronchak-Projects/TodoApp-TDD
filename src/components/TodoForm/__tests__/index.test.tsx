import { render, screen, act } from "@testing-library/react";
import TodoForm from "..";
import userEvent from "@testing-library/user-event";

describe('TodoForm', () => {

    test('should render correctly', () => {
        render(<TodoForm onSubmit={jest.fn()} />);

        expect(screen.getByText('ADD')).toBeInTheDocument();
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
        expect(input.classList.contains('is-invalid')).toBeFalsy();
        expect(screen.queryByText(`Todo's description is required`)).toBeNull();
    });

    test('should show error message and not call on submit when click in the button with the input been empty', () => {
        const onSubmitMock = jest.fn();
        render(<TodoForm onSubmit={onSubmitMock} />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.click(button);
        });

        expect(screen.getByText(`Todo's description is required`)).toBeInTheDocument();
        expect(onSubmitMock).not.toHaveBeenCalled();
        expect(input.classList.contains('is-invalid')).toBeTruthy();
    });

    test('should remove error message after user start typing in the input', () => {
        render(<TodoForm onSubmit={jest.fn()} />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.click(button);
            userEvent.type(input, 'Sleep');
        });

        expect(screen.getByDisplayValue('Sleep')).toBeInTheDocument();
        expect(screen.queryByText(`Todo's description is required`)).toBeNull();
        expect(input.classList.contains('is-invalid')).toBeFalsy();
    });

    test('should call onSubmit in the typed value and clear input when button in clicked', () => {
        const onSubmitMock = jest.fn();
        render(<TodoForm onSubmit={onSubmitMock} />);

        const button = screen.getByText('ADD');
        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'Sleep');
            userEvent.click(button);
        });

        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith('Sleep');
        expect(input.value).toBe('');
        expect(screen.queryByText(`Todo's description is required`)).toBeNull();
        expect(input.classList.contains('is-invalid')).toBeFalsy();
    });

    test('should call onSubmit in the typed value and clear input when user press enter in the input', () => {
        const onSubmitMock = jest.fn();
        render(<TodoForm onSubmit={onSubmitMock} />);

        const input = screen.getByLabelText('Todo') as  HTMLInputElement;

        act(() => {
            userEvent.type(input, 'Sleep');
            userEvent.type(input, '{enter}');
        });

        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith('Sleep');
        expect(input.value).toBe('');
        expect(screen.queryByText(`Todo's description is required`)).toBeNull();
        expect(input.classList.contains('is-invalid')).toBeFalsy();
    })
});

