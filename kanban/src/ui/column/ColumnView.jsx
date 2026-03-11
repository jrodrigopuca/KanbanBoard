import { useEffect, useRef, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../task/TaskCard";
import "../shared/board.css";

const ColumnView = ({
    id,
    title,
    tasks,
    className = "",
    adjacentColumns = { prev: null, next: null },
    onUpdateTask,
    onDeleteTask,
    onMoveTaskToColumn,
    onOpenTaskDetails,
    onRenameColumn,
    onDeleteColumn,
    onClearColumn,
}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const actionsMenuRef = useRef(null);

    useEffect(() => {
        setEditedTitle(title);
    }, [title]);

    useEffect(() => {
        if (!isEditingTitle) {
            return;
        }

        setIsActionsMenuOpen(false);
    }, [isEditingTitle]);

    useEffect(() => {
        if (!isActionsMenuOpen) {
            return;
        }

        const handleClickOutside = (event) => {
            if (
                actionsMenuRef.current &&
                !actionsMenuRef.current.contains(event.target)
            ) {
                setIsActionsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isActionsMenuOpen]);

    const handleSaveTitle = () => {
        const didSave = onRenameColumn(id, editedTitle);

        if (didSave) {
            setIsEditingTitle(false);
        }
    };

    const handleCancelTitle = () => {
        setEditedTitle(title);
        setIsEditingTitle(false);
    };

    const handleOpenRename = () => {
        setIsActionsMenuOpen(false);
        setIsEditingTitle(true);
    };

    const handleClearColumn = () => {
        setIsActionsMenuOpen(false);
        onClearColumn(id);
    };

    const handleDeleteColumn = () => {
        setIsActionsMenuOpen(false);
        onDeleteColumn(id);
    };

    return (
        <div className={`column ${className}`.trim()}>
            <div className="column-header">
                {isEditingTitle ? (
                    <div className="column-title-editor">
                        <input
                            aria-label={`Edit title for ${title}`}
                            className="input-add column-title-input"
                            onChange={(event) => setEditedTitle(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSaveTitle();
                                }

                                if (event.key === "Escape") {
                                    handleCancelTitle();
                                }
                            }}
                            type="text"
                            value={editedTitle}
                        />
                        <div className="column-actions">
                            <button
                                aria-label={`Save column ${title}`}
                                className="action-button"
                                onClick={handleSaveTitle}
                                type="button"
                            >
                                Save column
                            </button>
                            <button
                                aria-label={`Cancel editing column ${title}`}
                                className="action-button"
                                onClick={handleCancelTitle}
                                type="button"
                            >
                                Cancel edit
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="column-meta-row">
                            <span className="column-count-badge">
                                {tasks.length} {tasks.length === 1 ? "card" : "cards"}
                            </span>
                        </div>
                        <div className="column-title-row">
                            <h2>{title}</h2>
                            <div className="column-actions" ref={actionsMenuRef}>
                                <button
                                    aria-expanded={isActionsMenuOpen}
                                    aria-haspopup="menu"
                                    aria-label={`Open actions for column ${title}`}
                                    className="action-button subtle-button"
                                    onClick={() =>
                                        setIsActionsMenuOpen((currentValue) => !currentValue)
                                    }
                                    title="Column actions"
                                    type="button"
                                >
                                    ···
                                </button>
                                {isActionsMenuOpen && (
                                    <div
                                        aria-label={`Column actions for ${title}`}
                                        className="column-actions-menu"
                                        role="menu"
                                    >
                                        <button
                                            aria-label={`Edit column ${title}`}
                                            className="column-action-item is-active"
                                            onClick={handleOpenRename}
                                            role="menuitem"
                                            type="button"
                                        >
                                            Rename column
                                        </button>
                                        <button
                                            aria-label={`Clear tasks from column ${title}`}
                                            className="column-action-item"
                                            disabled={tasks.length === 0}
                                            onClick={handleClearColumn}
                                            role="menuitem"
                                            type="button"
                                        >
                                            Clear tasks
                                        </button>
                                        <button
                                            aria-label={`Delete column ${title}`}
                                            className="column-action-item is-danger"
                                            onClick={handleDeleteColumn}
                                            role="menuitem"
                                            type="button"
                                        >
                                            Delete column
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        className={`task-list ${
                            snapshot.isDraggingOver ? "dragging-over" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks?.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                {...task}
                                indexTask={index}
                                moveLeftColumn={adjacentColumns.prev}
                                moveRightColumn={adjacentColumns.next}
                                onDelete={onDeleteTask}
                                onEdit={onUpdateTask}
                                onMoveToColumn={onMoveTaskToColumn}
                                onOpenDetails={onOpenTaskDetails}
                            />
                        ))}
                        {provided.placeholder}
                        {!tasks?.length && (
                            <div className="column-empty-state">
                                <p>No cards yet</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ColumnView;
