import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";

import DashboardLayout from "@/components/layout/DashboardLayout.jsx";
import DashboardHome from "@/pages/Dashboard/DashboardHome.jsx";
import CustomersPage from "@/pages/Customers.jsx";
import CredentialsPage from "@/pages/CredentialsPage.jsx";
import IncomePage from "@/pages/Income.jsx";
import ExpensePage from "@/pages/Expense.jsx";

import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import ForgotPassword from "@/pages/Auth/ForgotPassword.jsx";
import Home from "@/pages/Home.jsx";
import RootRedirect from "@/pages/RootRedirect.jsx";

export default function Router() {
  return (
    <Routes>
      {/* Root path decides where to go */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* Protected app */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="credentials" element={<CredentialsPage />} />
        <Route path="income" element={<IncomePage />} />
        <Route path="expenses" element={<ExpensePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
