export const STORY_POINTS = [1, 2, 3, 5, 8, 13, 21];

export const getDefaultStoryPoints = () => STORY_POINTS[0];

export const getNextStoryPoints = ({
    currentPoints,
    direction = "increase",
}) => {
    const currentIndex = STORY_POINTS.findIndex(
        (value) => value === currentPoints,
    );
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;

    if (direction === "decrease") {
        return STORY_POINTS[Math.max(0, safeIndex - 1)];
    }

    return STORY_POINTS[Math.min(STORY_POINTS.length - 1, safeIndex + 1)];
};
