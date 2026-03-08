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
                    description:
                        "Review the refreshed board layout and align the card spacing with the visual system.",
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
                    description:
                        "Prepare the supporting API notes and verify the updated interactions end to end.",
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
