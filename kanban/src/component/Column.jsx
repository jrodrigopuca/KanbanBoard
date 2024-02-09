import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";
import "./styles.css";

const ColumnComponent = ({ id, title, tasks }) => {
  return (
		<>
			<div className="column">
				<h2>{title}</h2>
				<Droppable droppableId={id}>
					{(provided) => (
						<div
							className="task-list"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{tasks && tasks.map((task, index) => (
								<TaskComponent {...task} indexTask={index} key={task.id}/>
							))}
              {provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</>
	);
};

export default ColumnComponent;