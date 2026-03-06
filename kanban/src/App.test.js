import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
    window.localStorage.clear();
});

test("renders the kanban board title and default columns", () => {
    render(<App />);

    expect(screen.getByText(/kanban board/i)).toBeInTheDocument();
    expect(screen.getByText(/to do/i)).toBeInTheDocument();
    expect(screen.getByText(/progress/i)).toBeInTheDocument();
});

test("falls back to default columns when persisted data is invalid", () => {
    const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

    window.localStorage.setItem("localColumns", "{invalid-json");

    render(<App />);

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(screen.getByText(/kanban board/i)).toBeInTheDocument();
    expect(screen.getByText(/done/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
});

test("renames a column from the column actions", async () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: /edit column to do/i }));
    const input = screen.getByRole("textbox", {
        name: /edit title for to do/i,
    });

    userEvent.clear(input);
    userEvent.type(input, "Backlog{enter}");

    expect(
        screen.getByRole("heading", { name: /backlog \(2\)/i }),
    ).toBeInTheDocument();
});

test("confirms before deleting a column and removes its cards", async () => {
    render(<App />);

    userEvent.click(
        screen.getByRole("button", { name: /delete column to do/i }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
        screen.getByText(
            /this action will remove the column and permanently delete all its cards \(2\)/i,
        ),
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /delete column/i }));

    expect(
        screen.queryByRole("heading", { name: /to do \(2\)/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
