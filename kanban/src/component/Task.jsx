import React, {useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";

const TaskComponent = ({ id, title, date, indexTask, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(title);

  const handleDelete = () => {
    onDelete(id);
  };

  const dateToShow = date? "🕙 " + (new Date(date)).toLocaleString() : "";

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
              className="input-agregar"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <>
              <div className="task-date">{dateToShow}</div>
              <p className="task-title">{title}</p>
            </>
          )}
          {isEditing? (
            <button
              className="action-button"
              onClick={() => {
                setIsEditing(false);
                onEdit(id, { title: editedContent, date: Date.now() });
              }}
            >
              ✅
            </button>
          ) : (
            <div className="task-actions">
              <button className="action-button" onClick={handleDelete}>❌</button>
              <button className="action-button" onClick={()=>{setIsEditing(true)}}>⭕</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
