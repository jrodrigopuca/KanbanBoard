import { useEffect, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
    STORY_POINTS,
    getDefaultStoryPoints,
} from "../../domain/services/storyPoints";
import {
    DEFAULT_PRIORITY,
    getPriorityLabel,
    normalizeLabels,
    normalizePriority,
} from "../../domain/services/taskMetadata";
import { getSubtaskProgress } from "../../domain/services/subtasks";
import "../shared/board.css";

export const getTaskCardStyle = (style, isDragging) => {
    if (!style) {
        return undefined;
    }

    if (!isDragging || !style.transform) {
        return style;
    }

    return {
        ...style,
        transform: `${style.transform} rotate(1deg) scale(1.01)`,
        zIndex: 6,
    };
};

const TaskCard = ({
    id,
    title,
    date,
    points,
    description,
    priority,
    labels,
    subtasks,
    indexTask,
    moveLeftColumn,
    moveRightColumn,
    onEdit,
    onDelete,
    onMoveToColumn,
    onOpenDetails,
}) => {
    const [isPointsSelectorOpen, setIsPointsSelectorOpen] = useState(false);
    const pointsControlRef = useRef(null);

    useEffect(() => {
        if (!isPointsSelectorOpen) {
            return;
        }

        const handleClickOutside = (event) => {
            if (
                pointsControlRef.current &&
                !pointsControlRef.current.contains(event.target)
            ) {
                setIsPointsSelectorOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPointsSelectorOpen]);

    const handleDelete = () => {
        onDelete(id);
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
    const descriptionPreview = description?.trim();

    return (
        <Draggable draggableId={id} index={indexTask}>
            {(provided, snapshot) => (
                <div
                    className={`task ${snapshot.isDragging ? "dragging" : ""}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={getTaskCardStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging,
                    )}
                    title={dateToShow}
                >
                    <div className="task-header">
                        <div className="task-title-stack">
                            <div className="task-title-row">
                                <span
                                    aria-hidden="true"
                                    className={`task-priority-dot task-priority-dot-${taskPriority}`}
                                />
                                <p className="task-title">{title}</p>
                            </div>
                            {descriptionPreview && (
                                <p className="task-description-preview">
                                    {descriptionPreview}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="task-footer">
                        <div className="task-bottom-row">
                            <div className="task-meta-row">
                                <span
                                    className={`task-priority-badge task-priority-${taskPriority}`}
                                >
                                    {getPriorityLabel(taskPriority)}
                                </span>
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
                            </div>
                            <div
                                className="task-trailing-controls"
                                ref={pointsControlRef}
                            >
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
                                    <span aria-hidden="true" className="task-points-caret">
                                        ▾
                                    </span>
                                    <span>{pointsToShow}</span>
                                </button>
                                <div className="task-action-bar task-actions">
                                    <button
                                        aria-label={`Open details for ${title}`}
                                        className="action-button primary-button task-action-button task-action-icon task-open-details-button"
                                        onClick={() => onOpenDetails(id)}
                                        type="button"
                                    >
                                        <span aria-hidden="true">→</span>
                                    </button>
                                    <button
                                        aria-label={`Delete task ${title}`}
                                        className="action-button subtle-button task-action-button task-action-icon task-delete-button"
                                        onClick={handleDelete}
                                        type="button"
                                    >
                                        <span aria-hidden="true">✕</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(moveLeftColumn || moveRightColumn) && (
                        <div className="task-move-bar">
                            {moveLeftColumn ? (
                                <button
                                    aria-label={`Move to ${moveLeftColumn.title}`}
                                    className="action-button subtle-button task-move-button"
                                    onClick={() => onMoveToColumn(id, moveLeftColumn.id)}
                                    type="button"
                                >
                                    <span aria-hidden="true">←</span> {moveLeftColumn.title}
                                </button>
                            ) : (
                                <span />
                            )}
                            {moveRightColumn ? (
                                <button
                                    aria-label={`Move to ${moveRightColumn.title}`}
                                    className="action-button subtle-button task-move-button"
                                    onClick={() => onMoveToColumn(id, moveRightColumn.id)}
                                    type="button"
                                >
                                    {moveRightColumn.title} <span aria-hidden="true">→</span>
                                </button>
                            ) : (
                                <span />
                            )}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
