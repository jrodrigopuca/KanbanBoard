export const loadBoard = ({
    boardRepository,
    createDefaultColumns,
    logger = console,
}) => {
    try {
        const columns = boardRepository.load();

        if (Array.isArray(columns)) {
            return columns;
        }
    } catch (error) {
        logger.error("Unable to load board data from localStorage.", error);
    }

    return createDefaultColumns();
};
