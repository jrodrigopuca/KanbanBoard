import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
    STORY_POINTS,
    getDefaultStoryPoints,
    getNextStoryPoints,
} from "../../domain/services/storyPoints";
import {
    DEFAULT_PRIORITY,
    getPriorityLabel,
    normalizeLabels,
    normalizePriority,
} from "../../domain/services/taskMetadata";
import { getSubtaskProgress } from "../../domain/services/subtasks";
import "../shared/board.css";

const TaskCard = ({
    id,
    title,
    date,
    points,
    priority,
    labels,
    subtasks,
    indexTask,
    onEdit,
    onDelete,
    onOpenDetails,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(title);
    const [isPointsSelectorOpen, setIsPointsSelectorOpen] = useState(false);

    const handleDelete = () => {
        onDelete(id);
    };

    const handleChangePoints = (direction = "increase") => {
        setIsPointsSelectorOpen(false);
        onEdit(id, {
            points: getNextStoryPoints({
                currentPoints: points,
                direction,
            }),
        });
    };

    const handleSelectPoints = (nextPoints) => {
        setIsPointsSelectorOpen(false);
        onEdit(id, {
            points: nextPoints,
            date: Date.now(),
        });
    };

    const dateToShow = date
        ? `Updated ${new Date(date).toLocaleString()}`
        : "No recent updates";
    const pointsToShow = points || getDefaultStoryPoints();
    const taskPriority = normalizePriority(priority || DEFAULT_PRIORITY);
    const taskLabels = normalizeLabels(labels);
    const subtaskProgress = getSubtaskProgress(subtasks);

    return (
        <Draggable draggableId={id} index={indexTask}>
            {(provided, snapshot) => (
                <div
                    className={`task ${snapshot.isDragging ? "dragging" : ""}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {isEditing ? (
                        <div className="task-editor">
                            <input
                                aria-label={`Edit task ${title}`}
                                type="text"
                                className="input-add task-edit-input"
                                value={editedContent}
                                onChange={(event) =>
                                    setEditedContent(event.target.value)
                                }
                            />
                            <div className="task-actions task-actions-visible">
                                <button
                                    aria-label={`Save task ${title}`}
                                    className="action-button primary-button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        onEdit(id, {
                                            title: editedContent,
                                            date: Date.now(),
                                        });
                                    }}
                                    type="button"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="task-header">
                                <span className="task-kind">Card</span>
                                <span
                                    className={`task-priority-badge task-priority-${taskPriority}`}
                                >
                                    {getPriorityLabel(taskPriority)}
                                </span>
                                <button
                                    aria-expanded={isPointsSelectorOpen}
                                    aria-haspopup="dialog"
                                    aria-label={`Story points for ${title}`}
                                    className="task-points task-points-trigger"
                                    onClick={() =>
                                        setIsPointsSelectorOpen(
                                            (currentValue) => !currentValue,
                                        )
                                    }
                                    title="Story points"
                                    type="button"
                                >
                                    {pointsToShow}
                                </button>
                            </div>

                            {isPointsSelectorOpen && (
                                <div className="task-points-popover" role="dialog">
                                    <p className="task-points-popover-label">
                                        Estimate (points)
                                    </p>
                                    <div className="task-points-options">
                                        {STORY_POINTS.map((storyPoint) => (
                                            <button
                                                aria-label={`Set ${storyPoint} story points for ${title}`}
                                                className={`task-points-option ${
                                                    storyPoint === pointsToShow
                                                        ? "is-selected"
                                                        : ""
                                                }`}
                                                key={storyPoint}
                                                onClick={() =>
                                                    handleSelectPoints(storyPoint)
                                                }
                                                type="button"
                                            >
                                                {storyPoint}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="task-title">{title}</p>
                            {taskLabels.length > 0 && (
                                <div className="task-label-list">
                                    {taskLabels.map((label) => (
                                        <span className="task-label-chip" key={label}>
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {subtaskProgress.total > 0 && (
                                <div className="task-subtask-progress">
                                    <span className="task-subtask-badge">
                                        {subtaskProgress.completed}/{subtaskProgress.total} subtasks
                                    </span>
                                </div>
                            )}
                            <div className="task-footer">
                                <div className="task-date">{dateToShow}</div>
                                <div className="task-actions">
                                    <button
                                        aria-label={`View details for ${title}`}
                                        className="action-button subtle-button"
                                        onClick={() => onOpenDetails(id)}
                                        type="button"
                                    >
                                        Details
                                    </button>
                                    <button
                                        aria-label={`Delete task ${title}`}
                                        className="action-button danger-button"
                                        onClick={handleDelete}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        aria-label={`Edit task ${title}`}
                                        className="action-button subtle-button"
                                        onClick={() => setIsEditing(true)}
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        aria-label={`Increase story points for ${title}`}
                                        className="action-button subtle-button"
                                        onClick={() => handleChangePoints("increase")}
                                        type="button"
                                    >
                                        +SP
                                    </button>
                                    <button
                                        aria-label={`Decrease story points for ${title}`}
                                        className="action-button subtle-button"
                                        onClick={() => handleChangePoints("decrease")}
                                        type="button"
                                    >
                                        -SP
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
