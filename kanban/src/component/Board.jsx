import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid'; 
import ColumnComponent from "./Column";
import "./styles.css";

// inicializa columnas
const initColumns = () => {
	const savedColumns = localStorage.getItem("localColumns");
	if (savedColumns) {
		return JSON.parse(savedColumns);
	}
	return [{ id: uuidv4(), title: "TO DO", tasks: [{ id: uuidv4(), title: "Hello" }] }];
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
		console.log("result", result);
    const { source, destination } = result;
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
    const newTask = {title: newTaskInput,id: uuidv4()}
    newColumns[0].tasks.push(newTask); // Agregar tarea a la primera columna
    setColumns(newColumns);
    setNewTaskInput("");
	};

  const handleAddColumn = () => {   
    const newColumns = [...columns];
    const newColumn = {title: newColumnInput,id: uuidv4(), tasks:[] }
    newColumns.push(newColumn); // Agregar nueva columna
    setColumns(newColumns);
    setNewColumnInput("");
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="kanban-board">
					{columns.map((column, index) => (
						<ColumnComponent {...column} key={column.id} indexCol={index}/>
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
