import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cryptoApp from './reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(cryptoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const store = createStore(cryptoApp);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

registerServiceWorker();
