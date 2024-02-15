import React, {useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";

const TaskComponent = ({ id, title, date, points, indexTask, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(title);
  const availablePoints = [1,2,3,5,8,13,21];

  const handleDelete = () => {
    onDelete(id);
  };

  const handleChangePoints = (isPositive=true)=>{
    const index = availablePoints.findIndex((element)=>element === points);
    let position = 0;
    if (isPositive){
      position=((index+1)>(availablePoints.length-1))?availablePoints.length-1: index+1;
    }else{
      position=((index-1)<0)?0:index-1;
    }
    onEdit(id, { points: availablePoints[position]});
  }

  const dateToShow = date? "🕙 " + (new Date(date)).toLocaleString() : "";
  const pointsToShow = points || availablePoints[0];

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
              <div className="task-header">
                <div className="task-date">{dateToShow}</div>
                <div className="task-points">{pointsToShow}</div>
              </div>

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
              <button className="action-button" onClick={()=>handleChangePoints(true)}>🔺</button>
              <button className="action-button" onClick={()=>handleChangePoints(false)}>🔻</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
