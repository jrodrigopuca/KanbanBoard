import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";
import "./styles.css";

const ColumnComponent = ({ id, title, tasks, taskFunctions }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${
              snapshot.isDraggingOver ? "dragging-over" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks &&
              !!tasks.length &&
              tasks.map((task, index) => (
                <TaskComponent {...task} indexTask={index} onDelete={taskFunctions.onDelete} onEdit={taskFunctions.onEdit}/>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ColumnComponent;
