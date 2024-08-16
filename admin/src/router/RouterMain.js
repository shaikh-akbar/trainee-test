import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';
import DashboardMain from '../page/DashboardMain';

function RouterMain() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path='/dashboard/main' element={<DashboardMain />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default RouterMain;
