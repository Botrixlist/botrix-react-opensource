export const setNotifacation = (message) => {
    return {
        type: "DISPATCH",
        payload: message
    };
};

export const removeNotifacation = () => {
    return {
        type: "REMOVE"
    };
};