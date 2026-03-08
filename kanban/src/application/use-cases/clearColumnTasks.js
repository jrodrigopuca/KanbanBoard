export const clearColumnTasks = ({ columns, columnId }) =>
    columns.map((column) =>
        column.id === columnId ? { ...column, tasks: [] } : column,
    );
