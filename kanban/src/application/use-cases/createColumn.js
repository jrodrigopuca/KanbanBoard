import { createColumnModel } from "../../domain/models/column";

export const createColumn = ({ columns, title, createId }) => {
    const nextTitle = title.trim().toUpperCase();

    if (!nextTitle) {
        return columns;
    }

    return [
        ...columns,
        createColumnModel({
            id: createId(),
            title: nextTitle,
            tasks: [],
        }),
    ];
};
