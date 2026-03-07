import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
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
    const consoleErrorSpy = vi
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

    fireEvent.click(screen.getByRole("button", { name: /edit column to do/i }));
    const input = await screen.findByRole("textbox", {
        name: /edit title for to do/i,
    });

    fireEvent.change(input, { target: { value: "Backlog" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(
        await screen.findByRole("heading", { name: /backlog \(2\)/i }),
    ).toBeInTheDocument();
});

test("confirms before deleting a column and removes its cards", async () => {
    render(<App />);

    fireEvent.click(
        screen.getByRole("button", { name: /delete column to do/i }),
    );

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
        await screen.findByText(
            /this action will remove the column and permanently delete all its cards \(2\)/i,
        ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^delete column$/i }));

    expect(
        screen.queryByRole("heading", { name: /to do \(2\)/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
