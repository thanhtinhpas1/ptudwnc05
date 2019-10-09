import React from "react";
import { connect } from "react-redux";
import { move } from "../actions";
import { moveStep } from "../actions";
import { sortIncrease } from "../actions";
import { sortDecrease } from "../actions";
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // history: [
            //     {
            //         squares: Array(400).fill(null),
            //         position: []
            //     }
            // ],
            // isIncrease: true,
            // xIsNext: true,
            // status: "Next player: X",
            // isWin: false,
            // stepNumber: 0,
            // squaresWin: [],
            // isActive: -1
        };
    }

    handleClick(i) {
        this.props.move(i);
    }

    jumpTo(step) {
        this.props.moveStep(step);
    }

    sortIncrease() {
        this.props.sortIncrease();
    }

    sortDescrease() {
        this.props.sortDecrease();
    }

    render() {
        const {
            history,
            stepNumber,
            status,
            squaresWin,
            isIncrease,
            isActive
        } = this.props.game;
        const current = history[stepNumber];
        let desc;
        let moves;
        moves = history.map((step, move) => {
            desc = move ? `Go to move #${move} Position:#` : "Go to game start";
            return (
                <li key={step.position}>
                    <button
                        type="button"
                        className={isActive === move ? "active" : null}
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc} {step.position[move - 1]}
                    </button>
                </li>
            );
        });

        if (!isIncrease) {
            moves = moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div className="status">
                        {status}
                        <div className="step">
                            <button type="button" onClick={() => this.sortIncrease()}>
                                Sort Increase
              </button>
                            <button type="button" onClick={() => this.sortDescrease()}>
                                Sort Decrease
              </button>
                        </div>
                    </div>
                    <ol>{moves}</ol>
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        squaresWin={squaresWin}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}
// ========================================

const mapStateToProps = state => {
    return {
        game: state
    };
}

export default connect(mapStateToProps, { move, moveStep, sortIncrease, sortDecrease })(Game);
