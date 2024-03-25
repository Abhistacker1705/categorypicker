"use client";
import React from "react";
import Dashboard from "../../components/Dashboard";
import ProtectedRoute from "~/utils/auth";

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <Dashboard />;
    </ProtectedRoute>
  );
};

export default DashboardPage;
