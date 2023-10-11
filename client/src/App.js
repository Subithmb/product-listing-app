import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import AppRouter from './Routes/AppRouter';



const App = () => {
  return (
    <div>
    <Router>
      <Routes>
       
        <Route path="/*" element={<AppRouter/>}/>
       
      </Routes>
    </Router>
  </div>
  )
};

export default App;
