import { useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import CommandPalette from "./CommandPalette";
import ColumnView from "../column/ColumnView";
import TaskDetailDrawer from "../task/TaskDetailDrawer";
import "../shared/board.css";

const BoardView = ({
    columns,
    newColumnInput,
    newTaskInput,
    columnPendingDelete,
    selectedTask,
    toast,
    setNewColumnInput,
    setNewTaskInput,
    onUpdateTask,
    onDeleteTask,
    onDragEnd,
    onAddTask,
    onAddColumn,
    onRenameColumn,
    onRequestDeleteColumn,
    onCloseDeleteModal,
    onConfirmDeleteColumn,
    onRestoreDefaultBoard,
    onOpenTaskDetails,
    onCloseTaskDetails,
    onExportJson,
    onExportCsv,
    onDismissToast,
    onUndoToast,
}) => {
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [commandQuery, setCommandQuery] = useState("");
    const [activeCommandIndex, setActiveCommandIndex] = useState(0);
    const addTaskInputRef = useRef(null);
    const addColumnInputRef = useRef(null);
    const totalTasks = columns.reduce(
        (taskCount, column) => taskCount + column.tasks.length,
        0,
    );
    const populatedColumns = columns.filter((column) => column.tasks.length > 0).length;
    const hasColumns = columns.length > 0;
    const hasTasks = totalTasks > 0;

    const closeCommandPalette = () => {
        setIsCommandPaletteOpen(false);
        setCommandQuery("");
        setActiveCommandIndex(0);
    };

    const runPaletteCommand = (commandAction) => {
        commandAction();
        closeCommandPalette();
    };

    const focusTaskComposer = () => {
        addTaskInputRef.current?.focus();
    };

    const focusColumnComposer = () => {
        addColumnInputRef.current?.focus();
    };

    const allTaskCommands = columns.flatMap((column) =>
        column.tasks.map((task) => ({
            id: `task-${task.id}`,
            label: `Open task: ${task.title}`,
            group: "Tasks",
            description: `Open details from ${column.title}`,
            action: () => runPaletteCommand(() => onOpenTaskDetails(task.id)),
        })),
    );

    const paletteCommands = useMemo(
        () => [
            {
                id: "focus-task",
                label: "Focus new task input",
                group: "Board",
                description: "Jump to the quick add task composer",
                action: () => runPaletteCommand(focusTaskComposer),
            },
            {
                id: "focus-column",
                label: "Focus new column input",
                group: "Board",
                description: "Jump to the new column composer",
                action: () => runPaletteCommand(focusColumnComposer),
            },
            {
                id: "export-json",
                label: "Export board as JSON",
                group: "Export",
                description: "Download the current board state as JSON",
                action: () => runPaletteCommand(onExportJson),
            },
            {
                id: "export-csv",
                label: "Export board as CSV",
                group: "Export",
                description: "Download tasks and metadata in CSV format",
                action: () => runPaletteCommand(onExportCsv),
            },
            {
                id: "restore-board",
                label: "Restore starter board",
                group: "Board",
                description: "Reset columns and starter tasks",
                action: () => runPaletteCommand(onRestoreDefaultBoard),
            },
            ...allTaskCommands,
        ],
        [allTaskCommands, onExportCsv, onExportJson, onRestoreDefaultBoard],
    );

    const filteredCommands = useMemo(() => {
        const nextQuery = commandQuery.trim().toLowerCase();

        if (!nextQuery) {
            return paletteCommands;
        }

        const queryTokens = nextQuery.split(/\s+/).filter(Boolean);

        return paletteCommands.filter((command) =>
            queryTokens.every((token) =>
                [command.label, command.group, command.description]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(token)),
            ),
        );
    }, [commandQuery, paletteCommands]);

    useEffect(() => {
        if (filteredCommands.length === 0) {
            setActiveCommandIndex(0);
            return;
        }

        setActiveCommandIndex((currentIndex) =>
            Math.min(currentIndex, filteredCommands.length - 1),
        );
    }, [filteredCommands]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setIsCommandPaletteOpen((currentValue) => !currentValue);
            }

            if (event.key === "Escape") {
                setIsCommandPaletteOpen(false);
                setCommandQuery("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSubmitFirstCommand = () => {
        if (filteredCommands.length === 0) {
            return;
        }

        filteredCommands[activeCommandIndex]?.action();
    };

    const handleSelectNextCommand = () => {
        if (filteredCommands.length === 0) {
            return;
        }

        setActiveCommandIndex((currentIndex) =>
            currentIndex >= filteredCommands.length - 1 ? 0 : currentIndex + 1,
        );
    };

    const handleSelectPreviousCommand = () => {
        if (filteredCommands.length === 0) {
            return;
        }

        setActiveCommandIndex((currentIndex) =>
            currentIndex <= 0 ? filteredCommands.length - 1 : currentIndex - 1,
        );
    };

    return (
        <>
            <section className="board-shell">
                <div className="board-hero">
                    <div className="board-hero-copy">
                        <p className="board-eyebrow">Focused delivery workspace</p>
                        <h1 className="kanban-title">Kanban Board</h1>
                        <p className="board-subtitle">
                            Organize work with a cleaner board layout inspired by
                            modern planning tools.
                        </p>
                    </div>

                    <div className="board-stats" aria-label="Board summary">
                        <div className="board-stat-card">
                            <span className="board-stat-label">Columns</span>
                            <strong className="board-stat-value">{columns.length}</strong>
                        </div>
                        <div className="board-stat-card">
                            <span className="board-stat-label">Cards</span>
                            <strong className="board-stat-value">{totalTasks}</strong>
                        </div>
                        <div className="board-stat-card">
                            <span className="board-stat-label">Active lanes</span>
                            <strong className="board-stat-value">{populatedColumns}</strong>
                        </div>
                    </div>
                </div>

                <div className="board-toolbar">
                    <div className="composer-card">
                        <div className="composer-copy">
                            <span className="composer-label">Quick add</span>
                            <h2>Create task</h2>
                            <p>Add a new card directly into the first workflow column.</p>
                        </div>
                        <div className="composer-form add-task">
                            <input
                                ref={addTaskInputRef}
                                className="input-add"
                                type="text"
                                placeholder="New Task"
                                value={newTaskInput}
                                onChange={(event) => setNewTaskInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        onAddTask();
                                    }
                                }}
                            />
                            <button
                                className="action-button primary-button"
                                disabled={!newTaskInput}
                                onClick={onAddTask}
                                type="button"
                            >
                                Add task
                            </button>
                        </div>
                    </div>

                    <div className="composer-card">
                        <div className="composer-copy">
                            <span className="composer-label">Board structure</span>
                            <h2>Create column</h2>
                            <p>Expand your workflow with a new lane and keep the flow visible.</p>
                        </div>
                        <div className="composer-form add-column">
                            <input
                                ref={addColumnInputRef}
                                type="text"
                                className="input-add"
                                placeholder="New Column"
                                value={newColumnInput}
                                onChange={(event) => setNewColumnInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        onAddColumn();
                                    }
                                }}
                            />
                            <button
                                className="action-button"
                                disabled={!newColumnInput}
                                onClick={onAddColumn}
                                type="button"
                            >
                                Add column
                            </button>
                        </div>
                    </div>

                    <div className="composer-card export-card">
                        <div className="composer-copy">
                            <span className="composer-label">Data portability</span>
                            <h2>Export board</h2>
                            <p>
                                Download the current board with all task metadata,
                                including labels, subtasks, and priority.
                            </p>
                        </div>
                        <div className="composer-form export-actions">
                            <button
                                className="action-button subtle-button"
                                onClick={() => setIsCommandPaletteOpen(true)}
                                type="button"
                            >
                                Open palette
                            </button>
                            <button
                                className="action-button subtle-button"
                                onClick={onExportJson}
                                type="button"
                            >
                                Export JSON
                            </button>
                            <button
                                className="action-button primary-button"
                                onClick={onExportCsv}
                                type="button"
                            >
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="board-region">
                        <div className="board-region-header">
                            <div>
                                <p className="board-eyebrow">Workflow lanes</p>
                                <h2 className="board-region-title">Track work across stages</h2>
                            </div>
                            <p className="board-region-hint">
                                Drag cards between columns. On smaller screens, the board
                                scrolls horizontally to preserve each lane.
                            </p>
                        </div>

                        <div className="board-scroll-area">
                            {!hasColumns ? (
                                <div className="empty-board-state" role="status">
                                    <span className="empty-board-icon" aria-hidden="true">
                                        ○
                                    </span>
                                    <p className="board-eyebrow">Board empty</p>
                                    <h3>No workflow columns yet</h3>
                                    <p>
                                        Restore the starter board to recover the default
                                        workflow, or create a custom column to begin from
                                        scratch.
                                    </p>
                                    <div className="empty-board-actions">
                                        <button
                                            className="action-button primary-button"
                                            onClick={onRestoreDefaultBoard}
                                            type="button"
                                        >
                                            Restore starter board
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {!hasTasks && (
                                        <div className="empty-board-state compact" role="status">
                                            <span
                                                className="empty-board-icon"
                                                aria-hidden="true"
                                            >
                                                ✦
                                            </span>
                                            <div className="empty-board-copy">
                                                <p className="board-eyebrow">No cards yet</p>
                                                <h3>Your workflow is ready for the first task</h3>
                                                <p>
                                                    Use the quick add composer above to create
                                                    the first card and start moving work through
                                                    the board.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="kanban-board">
                                        {columns.map((column) => (
                                            <ColumnView
                                                {...column}
                                                key={column.id}
                                                canDeleteColumn={columns.length > 1}
                                                onDeleteColumn={onRequestDeleteColumn}
                                                onRenameColumn={onRenameColumn}
                                                onOpenTaskDetails={onOpenTaskDetails}
                                                onUpdateTask={onUpdateTask}
                                                onDeleteTask={onDeleteTask}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </DragDropContext>
            </section>

            {columnPendingDelete && (
                <div className="modal-overlay" role="presentation">
                    <div
                        aria-labelledby="delete-column-title"
                        aria-modal="true"
                        className="confirmation-modal"
                        role="dialog"
                    >
                        <h2 id="delete-column-title">
                            Delete column {columnPendingDelete.title}?
                        </h2>
                        <p>
                            This action will remove the column and permanently delete
                            all its cards ({columnPendingDelete.taskCount}).
                        </p>
                        <div className="modal-actions">
                            <button
                                className="action-button"
                                onClick={onCloseDeleteModal}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="action-button danger-button"
                                onClick={onConfirmDeleteColumn}
                                type="button"
                            >
                                Delete column
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedTask && (
                <TaskDetailDrawer
                    task={selectedTask}
                    onClose={onCloseTaskDetails}
                    onDeleteTask={onDeleteTask}
                    onSaveTask={onUpdateTask}
                />
            )}

            <CommandPalette
                activeCommandId={filteredCommands[activeCommandIndex]?.id}
                commands={filteredCommands}
                isOpen={isCommandPaletteOpen}
                onClose={closeCommandPalette}
                onQueryChange={setCommandQuery}
                onSelectNext={handleSelectNextCommand}
                onSelectPrevious={handleSelectPreviousCommand}
                onSubmit={handleSubmitFirstCommand}
                query={commandQuery}
            />

            {toast && (
                <div className="toast-region" aria-live="polite" aria-atomic="true">
                    <div className="toast-card" role="status">
                        <p className="toast-message">{toast.message}</p>
                        <div className="toast-actions">
                            {toast.previousColumns && (
                                <button
                                    className="action-button primary-button"
                                    onClick={onUndoToast}
                                    type="button"
                                >
                                    Undo
                                </button>
                            )}
                            <button
                                aria-label="Dismiss notification"
                                className="action-button subtle-button"
                                onClick={onDismissToast}
                                type="button"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BoardView;
