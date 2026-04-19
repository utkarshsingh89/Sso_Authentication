import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App({ keycloak }) {
  return (
    <BrowserRouter>
      <ProtectedRoute keycloak={keycloak}>
        {(user) => (
          <div className="min-h-screen flex bg-gray-100">
            
            <Sidebar user={user} />

            <div className="flex-1 p-10">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route
  path="/settings"
  element={<Settings keycloak={keycloak} />}
/>
                <Route
                  path="/admin"
                  element={
                    <AdminRoute user={user}>
                      <Admin user={user} />
                    </AdminRoute>
                  }
                />
              </Routes>
            </div>

          </div>
        )}
      </ProtectedRoute>
    </BrowserRouter>
  );
}