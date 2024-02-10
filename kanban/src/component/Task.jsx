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
          {isEditing ? (
            <button
              onClick={() => {
                setIsEditing(false);
                onEdit(id, { title: editedContent });
              }}
            >
              guardar
            </button>
          ) : (
            <>
              <button onClick={handleDelete}>x</button>
              <button onClick={()=>{setIsEditing(true)}}>o</button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
