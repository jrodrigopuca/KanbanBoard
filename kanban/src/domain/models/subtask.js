export const createSubtaskModel = ({ id, title, completed = false }) => ({
    id,
    title,
    completed: Boolean(completed),
});
