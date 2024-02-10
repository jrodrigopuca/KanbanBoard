import React, {useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";

const TaskComponent = ({ id, title, indexTask, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(title);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Draggable draggableId={id} index={indexTask} key={id}>
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
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p>{title}</p>
          )}
          {isEditing? (
            <button
              onClick={() => {
                setIsEditing(false);
                onEdit(id, { title: editedContent });
              }}
            >
              💾
            </button>
          ) : (
            <div className="task-actions">
              <button className="action-button" onClick={handleDelete}>🗑️</button>
              <button className="action-button" onClick={()=>{setIsEditing(true)}}>📝</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
