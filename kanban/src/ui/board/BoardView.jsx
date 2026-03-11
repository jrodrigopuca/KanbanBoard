import { useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import CommandPalette from "./CommandPalette";
import ColumnView from "../column/ColumnView";
import TaskDetailDrawer from "../task/TaskDetailDrawer";
import "../shared/board.css";

const MOBILE_MEDIA_QUERY = "(max-width: 720px)";

const getIsMobileLayout = () => {
    if (typeof window === "undefined") {
        return false;
    }

    if (typeof window.matchMedia === "function") {
        return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
    }

    return window.innerWidth <= 720;
};

const BoardView = ({
    columns,
    newColumnInput,
    newTaskInput,
    columnPendingDelete,
    columnPendingClear,
    selectedTask,
    toast,
    setNewColumnInput,
    setNewTaskInput,
    onUpdateTask,
    onDeleteTask,
    onMoveTaskToColumn,
    onDragEnd,
    onAddTask,
    onAddColumn,
    onRenameColumn,
    onRequestDeleteColumn,
    onRequestClearColumn,
    onCloseDeleteModal,
    onConfirmDeleteColumn,
    onCloseClearModal,
    onConfirmClearColumn,
    onRestoreDefaultBoard,
    onOpenTaskDetails,
    onCloseTaskDetails,
    onExportJson,
    onExportCsv,
    onDismissToast,
    onUndoToast,
}) => {
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [selectedExportFormat, setSelectedExportFormat] = useState("json");
    const [commandQuery, setCommandQuery] = useState("");
    const [activeCommandIndex, setActiveCommandIndex] = useState(0);
    const [isMobileLayout, setIsMobileLayout] = useState(getIsMobileLayout);
    const [activeMobileColumnId, setActiveMobileColumnId] = useState(
        columns[0]?.id ?? null,
    );
    const addTaskInputRef = useRef(null);
    const addColumnInputRef = useRef(null);
    const deleteModalRef = useRef(null);
    const clearModalRef = useRef(null);
    const deleteModalConfirmRef = useRef(null);
    const clearModalConfirmRef = useRef(null);
    const totalTasks = columns.reduce(
        (taskCount, column) => taskCount + column.tasks.length,
        0,
    );
    const populatedColumns = columns.filter((column) => column.tasks.length > 0).length;
    const hasColumns = columns.length > 0;
    const hasTasks = totalTasks > 0;
    const estimatedExportSize = useMemo(() => {
        const sizeInBytes = new Blob([JSON.stringify(columns)]).size;

        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        }

        return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    }, [columns]);

    const closeCommandPalette = () => {
        setIsCommandPaletteOpen(false);
        setCommandQuery("");
        setActiveCommandIndex(0);
    };

    const closeExportModal = () => {
        setIsExportModalOpen(false);
        setSelectedExportFormat("json");
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

    const handleOpenExportModal = () => {
        setIsExportModalOpen(true);
    };

    const handleSubmitExport = () => {
        if (selectedExportFormat === "csv") {
            onExportCsv();
        } else {
            onExportJson();
        }

        closeExportModal();
    };

    const handleSelectPreviousColumn = () => {
        if (!columns.length) {
            return;
        }

        const currentIndex = columns.findIndex(
            (column) => column.id === activeMobileColumnId,
        );
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextIndex = safeIndex <= 0 ? columns.length - 1 : safeIndex - 1;

        setActiveMobileColumnId(columns[nextIndex].id);
    };

    const handleSelectNextColumn = () => {
        if (!columns.length) {
            return;
        }

        const currentIndex = columns.findIndex(
            (column) => column.id === activeMobileColumnId,
        );
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextIndex = safeIndex >= columns.length - 1 ? 0 : safeIndex + 1;

        setActiveMobileColumnId(columns[nextIndex].id);
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

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
        const handleMediaQueryChange = (event) => {
            setIsMobileLayout(event.matches);
        };

        setIsMobileLayout(mediaQuery.matches);

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleMediaQueryChange);

            return () => {
                mediaQuery.removeEventListener("change", handleMediaQueryChange);
            };
        }

        mediaQuery.addListener(handleMediaQueryChange);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        if (!columns.length) {
            setActiveMobileColumnId(null);
            return;
        }

        setActiveMobileColumnId((currentColumnId) => {
            if (columns.some((column) => column.id === currentColumnId)) {
                return currentColumnId;
            }

            return columns[0].id;
        });
    }, [columns]);

    // Focus management for delete column modal
    useEffect(() => {
        if (columnPendingDelete && deleteModalConfirmRef.current) {
            deleteModalConfirmRef.current.focus();
        }
    }, [columnPendingDelete]);

    // Focus management for clear column modal
    useEffect(() => {
        if (columnPendingClear && clearModalConfirmRef.current) {
            clearModalConfirmRef.current.focus();
        }
    }, [columnPendingClear]);

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

            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
                if (toast?.previousColumns) {
                    event.preventDefault();
                    onUndoToast();
                }
            }

            if (event.key === "Escape") {
                setIsCommandPaletteOpen(false);
                setCommandQuery("");
                closeExportModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onUndoToast, toast]);

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
                {isMobileLayout && (
                    <div className="mobile-board-header">
                        <div className="mobile-header-brand">
                            <span className="mobile-header-title">Kanban Board</span>
                            <span className="mobile-header-caption">Focused delivery workspace</span>
                        </div>
                        <button
                            aria-label="Open quick actions"
                            className="action-button subtle-button mobile-search-button"
                            onClick={() => setIsCommandPaletteOpen(true)}
                            type="button"
                        >
                            ⌕
                        </button>
                    </div>
                )}

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

                    <button
                        aria-label="Open command palette"
                        className="board-command-hint"
                        onClick={() => setIsCommandPaletteOpen(true)}
                        title="Open command palette (Cmd+K)"
                        type="button"
                    >
                        <span aria-hidden="true">⌘K</span>
                    </button>
                </div>

                <div className="board-toolbar">
                    <div className="composer-card task-composer-card">
                        <div className="composer-copy">
                            <span className="composer-label">Quick add</span>
                            <h2>Create task</h2>
                            <p>Add a new card directly into the first workflow column.</p>
                        </div>
                        <div className="task-composer-surface">
                            <div className="task-composer-title-row">
                                <span
                                    aria-hidden="true"
                                    className="task-priority-dot task-priority-dot-medium"
                                />
                                <input
                                    aria-label="Quick add task title"
                                    ref={addTaskInputRef}
                                    className="task-composer-input"
                                    type="text"
                                    placeholder="Set up CI environment..."
                                    value={newTaskInput}
                                    onChange={(event) => setNewTaskInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            onAddTask();
                                        }
                                    }}
                                />
                            </div>
                            <p className="task-composer-description">
                                Add the title now and complete details from the task drawer.
                            </p>
                            <div className="task-composer-divider" />
                            <div className="task-composer-footer">
                                <span className="task-composer-meta-pill">First lane</span>
                                <span className="task-composer-meta-pill">Quick add</span>
                                <button
                                    aria-label="Create task"
                                    className="action-button task-composer-submit"
                                    disabled={!newTaskInput}
                                    onClick={onAddTask}
                                    type="button"
                                >
                                    Enter ↵
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="composer-card column-composer-card">
                        <div className="composer-copy">
                            <span className="composer-label">Board structure</span>
                            <h2>Create column</h2>
                            <p>Expand your workflow with a new lane and keep the flow visible.</p>
                        </div>
                        <div className="column-composer-input-shell">
                            <input
                                aria-label="New column title"
                                ref={addColumnInputRef}
                                type="text"
                                className="column-composer-input"
                                placeholder="ARCHIVED"
                                value={newColumnInput}
                                onChange={(event) => setNewColumnInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        onAddColumn();
                                    }
                                }}
                            />
                            <button
                                aria-label="Create column"
                                className="action-button column-composer-submit"
                                disabled={!newColumnInput}
                                onClick={onAddColumn}
                                type="button"
                            >
                                Enter ↵
                            </button>
                        </div>
                        <div className="column-composer-preview" aria-hidden="true">
                            <span>Cards will appear here</span>
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
                                className="action-button primary-button"
                                onClick={handleOpenExportModal}
                                type="button"
                            >
                                Export board
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

                        {isMobileLayout && hasColumns && (
                            <div className="mobile-lane-shell">
                                <p className="mobile-lane-label">Current lane</p>
                                <div
                                    className="mobile-lane-nav"
                                    aria-label="Mobile lane navigation"
                                >
                                <button
                                    className="action-button subtle-button mobile-lane-step"
                                    onClick={handleSelectPreviousColumn}
                                    type="button"
                                >
                                    Prev
                                </button>
                                <div className="mobile-lane-tabs" role="tablist">
                                    {columns.map((column) => (
                                        <button
                                            aria-selected={column.id === activeMobileColumnId}
                                            className={`mobile-lane-tab ${
                                                column.id === activeMobileColumnId
                                                    ? "is-active"
                                                    : ""
                                            }`}
                                            key={column.id}
                                            onClick={() =>
                                                setActiveMobileColumnId(column.id)
                                            }
                                            role="tab"
                                            type="button"
                                        >
                                            <span>{column.title}</span>
                                            <span className="mobile-lane-count">
                                                {column.tasks.length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="action-button subtle-button mobile-lane-step"
                                    onClick={handleSelectNextColumn}
                                    type="button"
                                >
                                    Next
                                </button>
                                </div>
                            </div>
                        )}

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

                                    <div
                                        className={`kanban-board ${
                                            isMobileLayout ? "mobile-focused-board" : ""
                                        }`.trim()}
                                    >
                                        {columns.map((column, columnIndex) => (
                                            <ColumnView
                                                {...column}
                                                adjacentColumns={{
                                                    prev: columnIndex > 0
                                                        ? { id: columns[columnIndex - 1].id, title: columns[columnIndex - 1].title }
                                                        : null,
                                                    next: columnIndex < columns.length - 1
                                                        ? { id: columns[columnIndex + 1].id, title: columns[columnIndex + 1].title }
                                                        : null,
                                                }}
                                                className={
                                                    isMobileLayout
                                                        ? column.id === activeMobileColumnId
                                                            ? "mobile-column-active"
                                                            : "mobile-column-hidden"
                                                        : ""
                                                }
                                                key={column.id}
                                                onClearColumn={onRequestClearColumn}
                                                onDeleteColumn={onRequestDeleteColumn}
                                                onMoveTaskToColumn={onMoveTaskToColumn}
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
                <div
                    className="modal-overlay"
                    onClick={onCloseDeleteModal}
                    ref={deleteModalRef}
                >
                    <div
                        aria-labelledby="delete-column-title"
                        aria-modal="true"
                        className="confirmation-modal"
                        onClick={(event) => event.stopPropagation()}
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
                                ref={deleteModalConfirmRef}
                                type="button"
                            >
                                Delete column
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {columnPendingClear && (
                <div
                    className="modal-overlay"
                    onClick={onCloseClearModal}
                    ref={clearModalRef}
                >
                    <div
                        aria-labelledby="clear-column-title"
                        aria-modal="true"
                        className="confirmation-modal"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                    >
                        <h2 id="clear-column-title">
                            Clear tasks from {columnPendingClear.title}?
                        </h2>
                        <p>
                            This action will remove all cards from the column
                            ({columnPendingClear.taskCount}) but keep the lane in place.
                        </p>
                        <div className="modal-actions">
                            <button
                                className="action-button"
                                onClick={onCloseClearModal}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="action-button danger-button"
                                onClick={onConfirmClearColumn}
                                ref={clearModalConfirmRef}
                                type="button"
                            >
                                Clear tasks
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isExportModalOpen && (
                <div
                    className="modal-overlay"
                    onClick={closeExportModal}
                >
                    <div
                        aria-labelledby="export-board-title"
                        aria-modal="true"
                        className="export-modal"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                    >
                        <div className="export-modal-header">
                            <div>
                                <p className="board-eyebrow">Data portability</p>
                                <h2 id="export-board-title">Export board</h2>
                                <p className="export-modal-copy">
                                    Download a backup of your columns, tasks and metadata.
                                </p>
                            </div>
                            <button
                                aria-label="Close export modal"
                                className="action-button subtle-button"
                                onClick={closeExportModal}
                                type="button"
                            >
                                Close
                            </button>
                        </div>

                        <div className="export-format-list">
                            <button
                                aria-pressed={selectedExportFormat === "json"}
                                className={`export-format-card ${
                                    selectedExportFormat === "json" ? "is-active" : ""
                                }`}
                                onClick={() => setSelectedExportFormat("json")}
                                type="button"
                            >
                                <strong>Complete backup (JSON)</strong>
                                <span>
                                    Keeps the full structure, including labels, priority and
                                    subtasks.
                                </span>
                            </button>
                            <button
                                aria-pressed={selectedExportFormat === "csv"}
                                className={`export-format-card ${
                                    selectedExportFormat === "csv" ? "is-active" : ""
                                }`}
                                onClick={() => setSelectedExportFormat("csv")}
                                type="button"
                            >
                                <strong>Table format (CSV)</strong>
                                <span>
                                    Flattens tasks and metadata into a spreadsheet-friendly file.
                                </span>
                            </button>
                        </div>

                        <div className="export-modal-footer">
                            <span className="export-size-note">
                                Estimated size: {estimatedExportSize}
                            </span>
                            <div className="modal-actions export-modal-actions">
                                <button
                                    className="action-button subtle-button"
                                    onClick={closeExportModal}
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="action-button primary-button"
                                    onClick={handleSubmitExport}
                                    type="button"
                                >
                                    Download {selectedExportFormat.toUpperCase()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTask && (
                <TaskDetailDrawer
                    columns={columns}
                    task={selectedTask}
                    onClose={onCloseTaskDetails}
                    onDeleteTask={onDeleteTask}
                    onMoveTaskToColumn={onMoveTaskToColumn}
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
                    <div className={`toast-card toast-${toast.type || "info"}`} role="status">
                        <p className="toast-message">{toast.message}</p>
                        <div className="toast-actions">
                            {toast.previousColumns && (
                                <button
                                    className="action-button primary-button"
                                    onClick={onUndoToast}
                                    type="button"
                                >
                                    {toast.actionLabel || "Undo"}
                                </button>
                            )}
                            {toast.shortcutHint && (
                                <span className="toast-shortcut">{toast.shortcutHint}</span>
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

            {isMobileLayout && (
                <button
                    aria-label="Quick add task"
                    className="mobile-fab"
                    onClick={focusTaskComposer}
                    type="button"
                >
                    +
                </button>
            )}
        </>
    );
};

export default BoardView;
