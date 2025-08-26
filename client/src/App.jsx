import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const EmployeePage = lazy(() => import("./pages/EmployeePage"));
const EmployeeForm = lazy(() => import("./pages/EmployeeForm"));
const TaskForm = lazy(() => import("./pages/TaskForm"));
const TaskPage = lazy(() => import("./pages/TaskPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function App() {
  return (
    <Layout>
   
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<h1>Home Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route element={<ProtectedRoute allowed={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<EmployeePage />} />
            <Route path="/admin/employees/form" element={<EmployeeForm />} />
            <Route
              path="/admin/employees/edit/:id"
              element={<EmployeeForm />}
            />
            <Route path="/admin/tasks" element={<TaskPage />} />
            <Route path="/admin/tasks/form" element={<TaskForm />} />
            <Route path="/admin/tasks/form/:empid" element={<TaskForm />} />
            <Route path="/admin/tasks/edit/:taskid" element={<TaskForm />} />
            <Route path="/admin/*" element={<NotFoundPage />} />
          </Route>

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
