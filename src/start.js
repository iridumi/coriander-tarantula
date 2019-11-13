import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";
import Welcome from "./welcome";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

//const store = createStore(reducer, applyMiddleware(reduxPromise));

// window.addEventListener("scroll", function() {
//     let header = document.querySelector(".header");
//     //let fixed = header.offsetTop;
//     //if (window.pageYOffset > fixed) {
//     if (window.pageYOffset > 100) {
//         header.classList.add("scrollHeader");
//     } else {
//         header.classList.remove("scrollHeader");
//     }
// });

let elem;
const userIsLoggedIn = location.pathname != "/welcome";
//const userIsLoggedIn = (location.pathname = "/");

//if (userIsLoggedIn) {
if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    init(store);
    //     //elem = <App />;
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
