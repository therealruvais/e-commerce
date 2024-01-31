import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="/signup"
        element={<SignupPage />}
      />
      <Route
        path="/activation/:activation_token"
        element={<ActivationPage />}
      />
    </Routes>
  );
}

export default App