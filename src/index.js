import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import { createStore } from "redux";
import rootReducer from "./reducers/Game";
import { Provider } from "react-redux";
import './Game.css'
import './index.css'
const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    rootElement
);
