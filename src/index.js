import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Todoapp from './Compnets/Todoapp';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
ReactDOM.render(<Todoapp />, document.getElementById('root'));

serviceWorker.unregister();
