export const getDays = (date) => {
    return Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
};