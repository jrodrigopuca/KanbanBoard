import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
    getDefaultStoryPoints,
    getNextStoryPoints,
} from "../../domain/services/storyPoints";
import "../shared/board.css";

const TaskCard = ({ id, title, date, points, indexTask, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(title);

    const handleDelete = () => {
        onDelete(id);
    };

    const handleChangePoints = (direction = "increase") => {
        onEdit(id, {
            points: getNextStoryPoints({
                currentPoints: points,
                direction,
            }),
        });
    };

    const dateToShow = date ? `🕙 ${new Date(date).toLocaleString()}` : "";
    const pointsToShow = points || getDefaultStoryPoints();

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
                        <input
                            type="text"
                            className="input-agregar"
                            value={editedContent}
                            onChange={(event) =>
                                setEditedContent(event.target.value)
                            }
                        />
                    ) : (
                        <>
                            <div className="task-header">
                                <div className="task-date">{dateToShow}</div>
                                <div className="task-points">{pointsToShow}</div>
                            </div>

                            <p className="task-title">{title}</p>
                        </>
                    )}
                    {isEditing ? (
                        <button
                            className="action-button"
                            onClick={() => {
                                setIsEditing(false);
                                onEdit(id, {
                                    title: editedContent,
                                    date: Date.now(),
                                });
                            }}
                            type="button"
                        >
                            ✅
                        </button>
                    ) : (
                        <div className="task-actions">
                            <button
                                className="action-button"
                                onClick={handleDelete}
                                type="button"
                            >
                                ❌
                            </button>
                            <button
                                className="action-button"
                                onClick={() => setIsEditing(true)}
                                type="button"
                            >
                                ⭕
                            </button>
                            <button
                                className="action-button"
                                onClick={() => handleChangePoints("increase")}
                                type="button"
                            >
                                🔺
                            </button>
                            <button
                                className="action-button"
                                onClick={() => handleChangePoints("decrease")}
                                type="button"
                            >
                                🔻
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
