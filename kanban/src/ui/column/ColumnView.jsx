import { useEffect, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../task/TaskCard";
import "../shared/board.css";

const ColumnView = ({
    id,
    title,
    tasks,
    className = "",
    onUpdateTask,
    onDeleteTask,
    onOpenTaskDetails,
    onRenameColumn,
    onDeleteColumn,
    onClearColumn,
    canDeleteColumn,
}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    useEffect(() => {
        setEditedTitle(title);
    }, [title]);

    useEffect(() => {
        if (!isEditingTitle) {
            return;
        }

        setIsActionsMenuOpen(false);
    }, [isEditingTitle]);

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
                                ✅
                            </button>
                            <button
                                aria-label={`Cancel editing column ${title}`}
                                className="action-button"
                                onClick={handleCancelTitle}
                                type="button"
                            >
                                ✖
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="column-meta-row">
                            <span className="column-chip">Workflow</span>
                            <span className="column-count-badge">
                                {tasks.length} {tasks.length === 1 ? "card" : "cards"}
                            </span>
                        </div>
                        <div className="column-title-row">
                            <h2>
                                {title} ({tasks.length})
                            </h2>
                            <div className="column-actions">
                                <button
                                    aria-expanded={isActionsMenuOpen}
                                    aria-haspopup="menu"
                                    aria-label={`Open actions for column ${title}`}
                                    className="action-button subtle-button"
                                    onClick={() =>
                                        setIsActionsMenuOpen((currentValue) => !currentValue)
                                    }
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
                                            disabled={!canDeleteColumn}
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
                        <p className="column-summary">
                            {tasks.length > 0
                                ? "Keep cards moving across the workflow."
                                : "No cards yet. Add one to get this lane started."}
                        </p>
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
                                onDelete={onDeleteTask}
                                onEdit={onUpdateTask}
                                onOpenDetails={onOpenTaskDetails}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ColumnView;
