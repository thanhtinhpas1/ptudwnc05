import calculateWinner from "../utils/WinnerUtils";
import { stat } from "fs";

const initialState = {
    history: [
        {
            squares: Array(400).fill(null),
            position: []
        }
    ],
    isIncrease: true,
    xIsNext: true,
    status: "Next player: X",
    isWin: false,
    stepNumber: 0,
    squaresWin: [],
    isActive: -1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "MOVE": {
            const i = action.payload;
            const { history, isWin, xIsNext, squaresWin, stepNumber } = state;
            const cloneHistory = history.slice(0, stepNumber + 1);
            const current = cloneHistory[cloneHistory.length - 1];
            const squares = current.squares.slice();
            const positions = current.position.slice();
            if (!squares[i] && !isWin) {
                squares[i] = xIsNext ? "X" : "O";
                const winner = calculateWinner(squares);
                const status = `Next player: ${xIsNext ? "X" : "O"}`;
                if (winner) {
                    return {
                        isIncrease: state.isIncrease,
                        xIsNext: state.xIsNext,
                        isActive: state.isActive,
                        history: cloneHistory.concat([
                            {
                                squares,
                                position: positions.concat(String(i))
                            }
                        ]),
                        status: `Winner: ${squares[winner[0]]}`,
                        isWin: true,
                        squaresWin: winner,
                        stepNumber: cloneHistory.length
                    };
                }

                return {
                    isActive: state.isActive,
                    isIncrease: state.isIncrease,
                    history: cloneHistory.concat([
                        {
                            squares,
                            position: positions.concat(String(i))
                        }
                    ]),
                    status: state.status,
                    isWin: state.isWin,
                    squaresWin: state.squaresWin,
                    xIsNext: !xIsNext,
                    stepNumber: cloneHistory.length
                };
            }
            break;
        }
        case "MOVE_STEP": {
            const step = action.payload;
            const { history, xIsNext } = state;
            const cloneHistory = history.slice(0, history.length);
            const current = cloneHistory[step];
            const squares = current.squares.slice();
            const winner = calculateWinner(squares);
            if (winner) {
                return {
                    history: state.history,
                    stepNumber: step,
                    xIsNext: step % 2 === 0,
                    status: `Winner: ${squares[winner[0]]}`,
                    isWin: true,
                    squaresWin: winner,
                    isActive: step
                };
            }
            // active: step
            return {
                isIncrease: state.isIncrease,
                history: state.history,
                stepNumber: step,
                xIsNext: step % 2 === 0,
                status: `Next player: ${xIsNext ? "X" : "O"}`,
                isWin: false,
                squaresWin: [],
                isActive: step
            };
        }
        case "SORT_INCREASE": {
            return {
                status: state.status,
                stepNumber: state.stepNumber,
                xIsNext: state.step % 2 === 0,
                history: state.history,
                isIncrease: true,
                isWin: false,
                squaresWin: [],
                isActive: state.isActive
            };
        }
        case "SORT_DECREASE": {
            return {
                status: state.status,
                stepNumber: state.stepNumber,
                xIsNext: state.step % 2 === 0,
                history: state.history,
                isIncrease: false,
                isWin: false,
                squaresWin: [],
                isActive: state.isActive
            };
        }
        default:
            return state;
    }
}
