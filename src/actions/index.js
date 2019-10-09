export const move = index => ({
    type: "MOVE",
    payload: index
});

export const moveStep = index => ({
    type: "MOVE_STEP",
    payload: index
});

export const sortIncrease = () => ({
    type: "SORT_INCREASE"
});

export const sortDecrease = () => ({
    type: "SORT_DECREASE"
});

export const Play = {
    move,
    moveStep,
    sortIncrease,
    sortDecrease
};
