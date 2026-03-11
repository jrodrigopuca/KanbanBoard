import { useEffect, useRef, useState } from "react";
import { createSubtaskModel } from "../../domain/models/subtask";
import {
    STORY_POINTS,
    getDefaultStoryPoints,
} from "../../domain/services/storyPoints";
import {
    DEFAULT_PRIORITY,
    getPriorityLabel,
    normalizeLabels,
    normalizePriority,
    TASK_PRIORITY_OPTIONS,
} from "../../domain/services/taskMetadata";
import { getSubtaskProgress, normalizeSubtasks } from "../../domain/services/subtasks";

const TaskDetailDrawer = ({ columns, task, onClose, onSaveTask, onDeleteTask, onMoveTaskToColumn }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(
        normalizePriority(task.priority || DEFAULT_PRIORITY),
    );
    const [labelInput, setLabelInput] = useState((task.labels || []).join(", "));
    const [subtasks, setSubtasks] = useState(normalizeSubtasks(task.subtasks));
    const [points, setPoints] = useState(task.points || getDefaultStoryPoints());
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
    const drawerRef = useRef(null);
    const titleInputRef = useRef(null);

    // Focus management: move focus to title input when drawer opens
    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(normalizePriority(task.priority || DEFAULT_PRIORITY));
        setLabelInput((task.labels || []).join(", "));
        setSubtasks(normalizeSubtasks(task.subtasks));
        setPoints(task.points || getDefaultStoryPoints());
        setNewSubtaskTitle("");
    }, [task]);

    const dateToShow = task.date
        ? new Date(task.date).toLocaleString()
        : "No recent updates";
    const normalizedLabels = normalizeLabels(labelInput);
    const subtaskProgress = getSubtaskProgress(subtasks);

    const handleSave = () => {
        onSaveTask(task.id, {
            title,
            description,
            priority,
            labels: normalizedLabels,
            subtasks,
            points,
            date: Date.now(),
        });
    };

    const handleSelectPoints = (nextPoints) => {
        setPoints(nextPoints);
    };

    const handleAddSubtask = () => {
        const nextTitle = newSubtaskTitle.trim();

        if (!nextTitle) {
            return;
        }

        setSubtasks((currentSubtasks) => [
            ...currentSubtasks,
            createSubtaskModel({
                id: typeof crypto !== "undefined" && crypto.randomUUID
                    ? crypto.randomUUID()
                    : `subtask-${Date.now()}`,
                title: nextTitle,
            }),
        ]);
        setNewSubtaskTitle("");
    };

    const handleToggleSubtask = (subtaskId) => {
        setSubtasks((currentSubtasks) =>
            currentSubtasks.map((subtask) =>
                subtask.id === subtaskId
                    ? { ...subtask, completed: !subtask.completed }
                    : subtask,
            ),
        );
    };

    const handleDeleteSubtask = (subtaskId) => {
        setSubtasks((currentSubtasks) =>
            currentSubtasks.filter((subtask) => subtask.id !== subtaskId),
        );
    };

    return (
        <div
            className="task-drawer-backdrop"
            onClick={onClose}
            ref={drawerRef}
        >
            <aside
                aria-labelledby="task-drawer-title"
                aria-modal="true"
                className="task-drawer"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
            >
                <div className="task-drawer-header">
                    <div className="task-drawer-summary">
                        <p className="board-eyebrow">Task details</p>
                        <div className="task-drawer-title-row">
                            <span
                                aria-hidden="true"
                                className={`task-priority-dot task-priority-dot-${priority}`}
                            />
                            <h2 id="task-drawer-title">{task.title}</h2>
                        </div>
                    </div>
                    <button
                        aria-label="Close task details"
                        className="action-button subtle-button task-action-button"
                        onClick={onClose}
                        type="button"
                    >
                        Close
                    </button>
                </div>

                <div className="task-drawer-meta">
                    <select
                        aria-label="Move task to column"
                        className="task-drawer-column-select"
                        onChange={(event) => onMoveTaskToColumn(task.id, event.target.value)}
                        value={task.columnId}
                    >
                        {columns.map((column) => (
                            <option key={column.id} value={column.id}>
                                {column.title}
                            </option>
                        ))}
                    </select>
                    <span className="task-date task-date-inline">Updated {dateToShow}</span>
                    <span className={`task-priority-badge task-priority-${priority}`}>
                        {getPriorityLabel(priority)}
                    </span>
                    <span className="task-points task-points-static">{points}</span>
                </div>

                <div className="task-drawer-content">
                    <label className="task-drawer-field">
                        <span>Task title</span>
                        <input
                            className="input-add"
                            onChange={(event) => setTitle(event.target.value)}
                            ref={titleInputRef}
                            type="text"
                            value={title}
                        />
                    </label>

                    <label className="task-drawer-field">
                        <span>Description</span>
                        <textarea
                            className="task-drawer-textarea"
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Add details, notes, or context for this task"
                            value={description}
                        />
                    </label>

                    <div className="task-drawer-grid">
                        <label className="task-drawer-field">
                            <span>Priority</span>
                            <select
                                aria-label="Task priority"
                                className="task-drawer-select"
                                onChange={(event) => setPriority(event.target.value)}
                                value={priority}
                            >
                                {TASK_PRIORITY_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="task-drawer-field">
                            <span>Labels</span>
                            <input
                                className="input-add"
                                onChange={(event) => setLabelInput(event.target.value)}
                                placeholder="Bug, UI, Backend"
                                type="text"
                                value={labelInput}
                            />
                            <small className="task-drawer-field-hint">Separate labels with commas</small>
                        </label>
                    </div>

                    {normalizedLabels.length > 0 && (
                        <div className="task-label-list">
                            {normalizedLabels.map((label) => (
                                <span className="task-label-chip" key={label}>
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="task-drawer-section">
                        <div className="task-drawer-section-header">
                            <div>
                                <p className="board-eyebrow">Subtasks</p>
                                <h3>
                                    {subtaskProgress.completed}/{subtaskProgress.total} completed
                                </h3>
                            </div>
                        </div>

                        <div className="task-subtask-composer">
                            <input
                                aria-label="New subtask"
                                className="input-add"
                                onChange={(event) => setNewSubtaskTitle(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleAddSubtask();
                                    }
                                }}
                                placeholder="Add a subtask"
                                type="text"
                                value={newSubtaskTitle}
                            />
                            <button
                                className="action-button subtle-button"
                                disabled={!newSubtaskTitle.trim()}
                                onClick={handleAddSubtask}
                                type="button"
                            >
                                Enter ↵
                            </button>
                        </div>

                        {subtasks.length > 0 ? (
                            <div className="task-subtask-list">
                                {subtasks.map((subtask) => (
                                    <div className="task-subtask-item" key={subtask.id}>
                                        <label className="task-subtask-toggle">
                                            <input
                                                aria-label={`Toggle subtask ${subtask.title}`}
                                                checked={subtask.completed}
                                                onChange={() =>
                                                    handleToggleSubtask(subtask.id)
                                                }
                                                type="checkbox"
                                            />
                                            <span
                                                className={subtask.completed ? "is-complete" : ""}
                                            >
                                                {subtask.title}
                                            </span>
                                        </label>
                                        <button
                                            aria-label={`Delete subtask ${subtask.title}`}
                                            className="action-button subtle-button"
                                            onClick={() => handleDeleteSubtask(subtask.id)}
                                            type="button"
                                        >
                                            Delete subtask
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="task-subtask-empty">
                                Break this task into smaller verifiable steps.
                            </p>
                        )}
                    </div>
                </div>

                <div className="task-drawer-section">
                    <div className="task-drawer-section-header">
                        <div>
                            <p className="board-eyebrow">Estimate</p>
                            <h3>Refine the effort with the same scale used on the card</h3>
                        </div>
                        <span className="task-points task-points-static">{points}</span>
                    </div>
                    <div className="task-drawer-points-grid">
                        {STORY_POINTS.map((storyPoint) => (
                            <button
                                aria-label={`Set ${storyPoint} story points for ${task.title}`}
                                className={`action-button task-points-option ${
                                    storyPoint === points ? "is-selected" : ""
                                }`}
                                key={storyPoint}
                                onClick={() => handleSelectPoints(storyPoint)}
                                type="button"
                            >
                                {storyPoint}
                            </button>
                        ))}
                    </div>

                </div>

                <div className="task-drawer-footer task-action-bar">
                    <button
                        aria-label="Close task details"
                        className="action-button subtle-button task-action-button"
                        onClick={onClose}
                        type="button"
                    >
                        Close
                    </button>
                    <button
                        aria-label={`Delete task ${task.title}`}
                        className="action-button danger-button task-action-button"
                        onClick={() => onDeleteTask(task.id)}
                        type="button"
                    >
                        Delete task
                    </button>
                    <button
                        className="action-button primary-button task-action-button"
                        onClick={handleSave}
                        type="button"
                    >
                        Save task
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default TaskDetailDrawer;