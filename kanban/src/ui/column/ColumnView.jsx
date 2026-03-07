import { useEffect, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../task/TaskCard";
import "../shared/board.css";

const ColumnView = ({
    id,
    title,
    tasks,
    onUpdateTask,
    onDeleteTask,
    onRenameColumn,
    onDeleteColumn,
    canDeleteColumn,
}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    useEffect(() => {
        setEditedTitle(title);
    }, [title]);

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

    return (
        <div className="column">
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
                    <div className="column-title-row">
                        <h2>
                            {title} ({tasks.length})
                        </h2>
                        <div className="column-actions">
                            <button
                                aria-label={`Edit column ${title}`}
                                className="action-button"
                                onClick={() => setIsEditingTitle(true)}
                                type="button"
                            >
                                ✏️
                            </button>
                            <button
                                aria-label={`Delete column ${title}`}
                                className="action-button danger-button"
                                disabled={!canDeleteColumn}
                                onClick={() => onDeleteColumn(id)}
                                type="button"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
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
