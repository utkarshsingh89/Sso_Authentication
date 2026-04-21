import { useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, LayoutDashboard, Shield, Menu } from "lucide-react";

export default function App({ keycloak }) {
  const username = keycloak.tokenParsed?.preferred_username;
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];

  const isAdmin = roles.includes("admin");

  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg ${open ? "w-64" : "w-16"} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">🚀 Sso Auth 2</h2>
          <Menu className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>

        <nav className="mt-6 space-y-2 px-2">
          <button
            onClick={() => setActive("dashboard")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl ${active === "dashboard" ? "bg-indigo-500 text-white" : "hover:bg-gray-200"}`}
          >
            <LayoutDashboard size={18} />
            {open && "Dashboard"}
          </button>

          {isAdmin && (
            <button
              onClick={() => setActive("admin")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl ${active === "admin" ? "bg-purple-500 text-white" : "hover:bg-gray-200"}`}
            >
              <Shield size={18} />
              {open && "Admin Panel"}
            </button>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {username}</h1>
              <p className="text-gray-500">Role: {isAdmin ? "Admin" : "User"}</p>
            </div>

            <button
              onClick={() => keycloak.logout()}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Dashboard Content */}
          {active === "dashboard" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Users</h3>
                <p className="text-2xl mt-2">3</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Sessions</h3>
                <p className="text-2xl mt-2">5</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold">Revenue</h3>
                <p className="text-2xl mt-2">$0.0</p>
              </div>
            </div>
          )}

          {/* Admin Panel */}
          {active === "admin" && isAdmin && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">Admin Panel 🔐</h2>
              <p className="text-gray-600">Only visible to Admin users</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}