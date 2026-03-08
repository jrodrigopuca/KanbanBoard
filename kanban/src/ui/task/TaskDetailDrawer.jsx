import { useEffect, useState } from "react";
import { createSubtaskModel } from "../../domain/models/subtask";
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
    TASK_PRIORITY_OPTIONS,
} from "../../domain/services/taskMetadata";
import { getSubtaskProgress, normalizeSubtasks } from "../../domain/services/subtasks";

const TaskDetailDrawer = ({ task, onClose, onSaveTask, onDeleteTask }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(
        normalizePriority(task.priority || DEFAULT_PRIORITY),
    );
    const [labelInput, setLabelInput] = useState((task.labels || []).join(", "));
    const [subtasks, setSubtasks] = useState(normalizeSubtasks(task.subtasks));
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(normalizePriority(task.priority || DEFAULT_PRIORITY));
        setLabelInput((task.labels || []).join(", "));
        setSubtasks(normalizeSubtasks(task.subtasks));
        setNewSubtaskTitle("");
    }, [task]);

    const pointsToShow = task.points || getDefaultStoryPoints();
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
            date: Date.now(),
        });
    };

    const handleChangePoints = (direction) => {
        onSaveTask(task.id, {
            points: getNextStoryPoints({
                currentPoints: task.points,
                direction,
            }),
            date: Date.now(),
        });
    };

    const handleSelectPoints = (nextPoints) => {
        onSaveTask(task.id, {
            points: nextPoints,
            date: Date.now(),
        });
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
        <div className="task-drawer-backdrop" role="presentation">
            <aside
                aria-labelledby="task-drawer-title"
                aria-modal="true"
                className="task-drawer"
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
                        aria-label="Dismiss task details"
                        className="action-button subtle-button task-action-button"
                        onClick={onClose}
                        type="button"
                    >
                        Close details
                    </button>
                </div>

                <div className="task-drawer-meta">
                    <span className="column-chip">{task.columnTitle}</span>
                    <span className="task-date task-date-inline">Updated {dateToShow}</span>
                    <span className={`task-priority-badge task-priority-${priority}`}>
                        {getPriorityLabel(priority)}
                    </span>
                    <span className="task-points task-points-static">{pointsToShow}</span>
                </div>

                <div className="task-drawer-content">
                    <label className="task-drawer-field">
                        <span>Task title</span>
                        <input
                            aria-label="Task title"
                            className="input-add"
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            value={title}
                        />
                    </label>

                    <label className="task-drawer-field">
                        <span>Description</span>
                        <textarea
                            aria-label="Task description"
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
                                aria-label="Task labels"
                                className="input-add"
                                onChange={(event) => setLabelInput(event.target.value)}
                                placeholder="Bug, UI, Backend"
                                type="text"
                                value={labelInput}
                            />
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
                                Create subtask
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
                        <span className="task-points task-points-static">{pointsToShow}</span>
                    </div>
                    <div className="task-drawer-points-grid">
                        {STORY_POINTS.map((storyPoint) => (
                            <button
                                aria-label={`Set ${storyPoint} story points for ${task.title}`}
                                className={`action-button task-points-option ${
                                    storyPoint === pointsToShow ? "is-selected" : ""
                                }`}
                                key={storyPoint}
                                onClick={() => handleSelectPoints(storyPoint)}
                                type="button"
                            >
                                {storyPoint}
                            </button>
                        ))}
                    </div>
                    <div className="task-drawer-actions">
                        <button
                            aria-label={`Decrease story points for ${task.title}`}
                            className="action-button subtle-button task-action-button"
                            onClick={() => handleChangePoints("decrease")}
                            type="button"
                        >
                            Lower estimate
                        </button>
                        <button
                            aria-label={`Increase story points for ${task.title}`}
                            className="action-button subtle-button task-action-button"
                            onClick={() => handleChangePoints("increase")}
                            type="button"
                        >
                            Raise estimate
                        </button>
                    </div>
                </div>

                <div className="task-drawer-footer task-action-bar">
                    <button
                        aria-label="Close task details"
                        className="action-button subtle-button task-action-button"
                        onClick={onClose}
                        type="button"
                    >
                        Close details
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