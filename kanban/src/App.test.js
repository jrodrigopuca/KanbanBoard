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

test("renders an empty board state and can restore starter columns", async () => {
    window.localStorage.setItem("localColumns", JSON.stringify([]));

    render(<App />);

    expect(
        screen.getByRole("heading", { name: /no workflow columns yet/i }),
    ).toBeInTheDocument();

    fireEvent.click(
        screen.getByRole("button", { name: /restore starter board/i }),
    );

    expect(
        await screen.findByRole("heading", { name: /to do \(2\)/i }),
    ).toBeInTheDocument();
});

test("opens the task detail drawer and saves task changes", async () => {
    render(<App />);

    fireEvent.click(
        screen.getByRole("button", { name: /view details for hello/i }),
    );

    expect(
        await screen.findByRole("dialog", { name: /hello/i }),
    ).toBeInTheDocument();

    const titleInput = screen.getByRole("textbox", { name: /task title/i });
    const descriptionInput = screen.getByRole("textbox", {
        name: /task description/i,
    });
    const labelsInput = screen.getByRole("textbox", { name: /task labels/i });
    const priorityInput = screen.getByRole("combobox", {
        name: /task priority/i,
    });
    const newSubtaskInput = screen.getByRole("textbox", {
        name: /new subtask/i,
    });

    fireEvent.change(titleInput, { target: { value: "Updated Hello" } });
    fireEvent.change(descriptionInput, {
        target: { value: "This card now has more implementation context." },
    });
    fireEvent.change(labelsInput, { target: { value: "Bug, UX" } });
    fireEvent.change(priorityInput, { target: { value: "high" } });
    fireEvent.click(
        screen.getByRole("checkbox", {
            name: /toggle subtask refine interactions/i,
        }),
    );
    fireEvent.change(newSubtaskInput, {
        target: { value: "Share implementation notes" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add subtask/i }));
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
        await screen.findByDisplayValue(/updated hello/i),
    ).toBeInTheDocument();
    expect(
        screen.getByDisplayValue(
            /this card now has more implementation context\./i,
        ),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(/bug, ux/i)).toBeInTheDocument();
    expect(
        screen.getByRole("combobox", { name: /task priority/i }),
    ).toHaveValue("high");
    expect(
        screen.getByRole("checkbox", {
            name: /toggle subtask refine interactions/i,
        }),
    ).toBeChecked();
    expect(screen.getByText(/share implementation notes/i)).toBeInTheDocument();

    fireEvent.click(
        screen.getByRole("button", { name: /close task details/i }),
    );

    expect(await screen.findByText(/updated hello/i)).toBeInTheDocument();
    expect(screen.getByText(/high priority/i)).toBeInTheDocument();
    expect(screen.getByText(/^bug$/i)).toBeInTheDocument();
    expect(screen.getByText(/^ux$/i)).toBeInTheDocument();
    expect(screen.getByText(/2\/3 subtasks/i)).toBeInTheDocument();
});

test("exports board data as json and csv", async () => {
    const createObjectURL = vi.fn(() => "blob:mock-url");
    const revokeObjectURL = vi.fn();
    const BlobMock = vi.fn(function Blob(parts, options) {
        return {
            parts,
            type: options?.type,
        };
    });
    const clickSpy = vi
        .spyOn(HTMLAnchorElement.prototype, "click")
        .mockImplementation(() => {});

    vi.stubGlobal("Blob", BlobMock);
    vi.stubGlobal("URL", {
        createObjectURL,
        revokeObjectURL,
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /export json/i }));
    fireEvent.click(screen.getByRole("button", { name: /export csv/i }));

    expect(createObjectURL).toHaveBeenCalledTimes(2);
    expect(clickSpy).toHaveBeenCalledTimes(2);

    const jsonBlob = createObjectURL.mock.calls[0][0];
    const csvBlob = createObjectURL.mock.calls[1][0];

    expect(jsonBlob.parts.join("")).toMatch(/"columns"/i);
    expect(jsonBlob.parts.join("")).toMatch(/"labels"/i);
    expect(csvBlob.parts.join("")).toMatch(
        /columnId,columnTitle,taskId,taskTitle/i,
    );
    expect(csvBlob.parts.join("")).toMatch(/Hello/i);

    clickSpy.mockRestore();
    vi.unstubAllGlobals();
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
