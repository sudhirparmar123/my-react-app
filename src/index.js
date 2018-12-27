import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';

//redux dependencies
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Store/reducer';

//ReactDOM.render(<App />, document.getElementById('root'));

const store = createStore(reducer);

ReactDOM.render(
    <Router>
        <Provider store={store}><App /></Provider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
