export const saveBoard = ({ boardRepository, columns, logger = console }) => {
    try {
        boardRepository.save(columns);
    } catch (error) {
        logger.error("Unable to save board data to localStorage.", error);
    }
};
