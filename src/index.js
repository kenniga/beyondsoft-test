import React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux'
import store from './redux/store'

import App from './App';

import './index.scss';

const root = document.getElementById("root");
render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);