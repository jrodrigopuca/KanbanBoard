export const createTaskModel = ({ id, title, date, points = 1 }) => ({
    id,
    title,
    date,
    points,
});
