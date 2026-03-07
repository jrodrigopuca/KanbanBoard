export const moveTask = ({ columns, result, now = () => Date.now() }) => {
    const { source, destination } = result;

    if (!destination) {
        return columns;
    }

    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    ) {
        return columns;
    }

    const nextColumns = columns.map((column) => ({
        ...column,
        tasks: [...column.tasks],
    }));

    const sourceColumn = nextColumns.find(
        (column) => column.id === source.droppableId,
    );
    const destinationColumn = nextColumns.find(
        (column) => column.id === destination.droppableId,
    );

    if (!sourceColumn || !destinationColumn) {
        return columns;
    }

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

    if (!movedTask) {
        return columns;
    }

    destinationColumn.tasks.splice(destination.index, 0, {
        ...movedTask,
        date: now(),
    });

    return nextColumns;
};
