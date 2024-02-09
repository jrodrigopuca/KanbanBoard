import React from "react";
import { Draggable} from "react-beautiful-dnd";
import "./styles.css";

const TaskComponent = ({ id, title, indexTask }) => {
	return (
			<Draggable draggableId={id} index={indexTask}>
				{(provided) => (
					<div
						className="task"
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						{title}
					</div>
				)}
			</Draggable>
	);
};

export default TaskComponent;