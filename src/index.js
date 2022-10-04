import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import cn from './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className={cn.logisticPage}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
