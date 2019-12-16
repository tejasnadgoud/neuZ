import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
//import {createStore } from 'redux';
//import myApp from './reducers'
import { Provider } from "react-redux";
import { store } from "./helpers/store";

//const store = store();
//let store = createStore(myApp);
/*DOM Render*/
//ReactDOM.render(<App />, document.getElementById('root'));

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}
store.subscribe(render);

render();
