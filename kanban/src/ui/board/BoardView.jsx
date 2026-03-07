import { DragDropContext } from "@hello-pangea/dnd";
import ColumnView from "../column/ColumnView";
import TaskDetailDrawer from "../task/TaskDetailDrawer";
import "../shared/board.css";

const BoardView = ({
    columns,
    newColumnInput,
    newTaskInput,
    columnPendingDelete,
    selectedTask,
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
}) => {
    const totalTasks = columns.reduce(
        (taskCount, column) => taskCount + column.tasks.length,
        0,
    );
    const populatedColumns = columns.filter((column) => column.tasks.length > 0).length;
    const hasColumns = columns.length > 0;
    const hasTasks = totalTasks > 0;

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
        </>
    );
};

export default BoardView;
