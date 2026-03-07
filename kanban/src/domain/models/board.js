import { createColumnModel } from "./column";
import { createTaskModel } from "./task";

export const createDefaultColumns = ({ createId, now = () => Date.now() }) => {
    const timestamp = now();

    return [
        createColumnModel({
            id: createId(),
            title: "TO DO",
            tasks: [
                createTaskModel({
                    id: createId(),
                    title: "Hello",
                    date: timestamp,
                    points: 1,
                    priority: "high",
                    labels: ["UI", "Planning"],
                    subtasks: [
                        {
                            id: createId(),
                            title: "Review visual layout",
                            completed: true,
                        },
                        {
                            id: createId(),
                            title: "Refine interactions",
                            completed: false,
                        },
                    ],
                }),
                createTaskModel({
                    id: createId(),
                    title: "World",
                    date: timestamp,
                    points: 1,
                    priority: "medium",
                    labels: ["Backend"],
                    subtasks: [
                        {
                            id: createId(),
                            title: "Prepare endpoint contract",
                            completed: false,
                        },
                    ],
                }),
            ],
        }),
        createColumnModel({
            id: createId(),
            title: "PROGRESS",
            tasks: [],
        }),
        createColumnModel({
            id: createId(),
            title: "TEST",
            tasks: [],
        }),
        createColumnModel({
            id: createId(),
            title: "DONE",
            tasks: [],
        }),
    ];
};
