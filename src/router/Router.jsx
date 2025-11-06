// src/router/Router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import DashboardHome from "../pages/Dashboard/DashboardHome.jsx";
import CustomersPage from "../pages/Customers.jsx";
import CredentialsPage from "../pages/CredentialsPage.jsx";
import IncomePage from "../pages/Income.jsx";      // create later
import ExpensePage from "../pages/Expense.jsx";    // create later

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* All app pages live under the layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="credentials" element={<CredentialsPage />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="expenses" element={<ExpensePage />} />
          {/* Optional: redirect any unknown child route to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
