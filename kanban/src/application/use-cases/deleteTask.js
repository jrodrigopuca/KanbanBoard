export const deleteTask = ({ columns, taskId }) =>
    columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
    }));
