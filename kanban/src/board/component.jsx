import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./styles.css";

// inicializa columnas
const initColumns = () => {
	const savedColumns = localStorage.getItem("localColumns");
	if (savedColumns) {
		return JSON.parse(savedColumns);
	}
	return [{ id: "todo", title: "TO DO", tasks: [{ id: "a", title: "Hello" }] }];
};

const guidGenerator = () => {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (
		S4() +
		S4() +
		"-" +
		S4() +
		"-" +
		S4() +
		"-" +
		S4() +
		"-" +
		S4() +
		S4() +
		S4()
	);
};

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

const ColumnComponent = ({ id, title, tasks, indexCol }) => {
  return (
		<>
			<div key={id} className="column">
				<h2>{title}</h2>
				<Droppable droppableId={indexCol} key={indexCol}>
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

const Board = () => {
	const [columns, setColumns] = useState(initColumns);
  const [newColumnInput, setNewColumnInput] = useState('');
  const [newTaskInput, setNewTaskInput] = useState('');

	// guardar columnas ante un cambio
	useEffect(() => {
		localStorage.setItem("localColumns", JSON.stringify(columns));
	}, [columns]);

	const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(column => column.id === source.droppableId);
    const destinationColumn = newColumns.find(column => column.id === destination.droppableId);
    if (!sourceColumn || !destinationColumn) return;

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, movedTask);
    setColumns(newColumns);
	};

	const handleAddTask = () => {   
    const newColumns = [...columns];
    const newTask = {title: newTaskInput,id: guidGenerator()}
    newColumns[0].tasks.push(newTask); // Agregar tarea a la primera columna
    setColumns(newColumns);
    setNewTaskInput("");
	};

  const handleAddColumn = () => {   
    const newColumns = [...columns];
    const newColumn = {title: newColumnInput,id: guidGenerator(), tasks:[] }
    newColumns.push(newColumn); // Agregar nueva columna
    setColumns(newColumns);
    setNewColumnInput("");
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="kanban-board">
					{columns.map((column, index) => (
						<ColumnComponent {...column} key={index} indexCol={index}/>
					))}
				</div>

        <div className="add-task">
					<input
						type="text"
						placeholder="Nueva Tarea"
						value={newTaskInput}
						onChange={(e) => setNewTaskInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleAddTask();
							}
						}}
					/>
					<button onClick={handleAddTask}>Agregar</button>
				</div>


        <div className="add-column">
					<input
						type="text"
						placeholder="Nueva Columna"
						value={newColumnInput}
						onChange={(e) => setNewColumnInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleAddColumn();
							}
						}}
					/>
					<button onClick={handleAddColumn}>Agregar</button>
				</div>
			</DragDropContext>
		</>
	);
};
export default Board;
