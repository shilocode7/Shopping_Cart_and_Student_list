import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Shop from './Shop';
import Student from './Student';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    {/* <Shop> to shope</Shop> */}
    <hr></hr><br></br><hr></hr>
    <Student> to student</Student>
  </>
);