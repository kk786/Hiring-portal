import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import Forget_pass from './components/Forget_pass.jsx';
import Employer from "./components/Employer.jsx";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from './components/Layout.jsx';


function App() {
    return (  
      
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/Employer" element={<Employer />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-pass" element={<Forget_pass />} />
        <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
      </Routes>
   

    );
}

export default App;
