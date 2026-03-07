export const deleteColumn = ({ columns, columnId }) =>
    columns.filter((column) => column.id !== columnId);
