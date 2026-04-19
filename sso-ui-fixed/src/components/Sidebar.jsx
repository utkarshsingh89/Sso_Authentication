import { Link } from "react-router-dom";
import keycloak from "../keycloak";

export default function Sidebar({ user }) {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">SSO Auth 🚀 </h1>

      <nav className="flex flex-col gap-3">
        <Link to="/" className="p-3 rounded-lg hover:bg-white/10 transition">
          🏠 Dashboard
        </Link>

        <Link to="/profile" className="p-3 rounded-lg hover:bg-white/10 transition">
          👤 Profile
        </Link>

        <Link to="/settings" className="p-3 rounded-lg hover:bg-white/10 transition">
          ⚙️ Settings
        </Link>

        {user?.roles?.includes("admin") && (
          <Link
            to="/admin"
            className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            🔐 Admin
          </Link>
        )}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => keycloak.logout()}
          className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}