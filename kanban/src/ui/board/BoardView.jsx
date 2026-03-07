import { DragDropContext } from "@hello-pangea/dnd";
import ColumnView from "../column/ColumnView";
import "../shared/board.css";

const BoardView = ({
    columns,
    newColumnInput,
    newTaskInput,
    columnPendingDelete,
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
}) => (
    <>
        <div className="kanban-title">Kanban Board</div>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
                {columns.map((column) => (
                    <ColumnView
                        {...column}
                        key={column.id}
                        canDeleteColumn={columns.length > 1}
                        onDeleteColumn={onRequestDeleteColumn}
                        onRenameColumn={onRenameColumn}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </div>
        </DragDropContext>

        <div className="form-board">
            <div className="add-task">
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
                    className="action-button"
                    disabled={!newTaskInput}
                    onClick={onAddTask}
                    type="button"
                >
                    +T
                </button>
            </div>

            <div className="add-column">
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
                    +C
                </button>
            </div>
        </div>

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
    </>
);

export default BoardView;
