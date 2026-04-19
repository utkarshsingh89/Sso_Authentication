import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Settings({ keycloak }) {
  const user = keycloak.tokenParsed;
  const roles = user?.realm_access?.roles || [];

  const [showToken, setShowToken] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Refresh token manually
  const refreshToken = async () => {
    try {
      await keycloak.updateToken(30);
      toast.success("Token refreshed ✅");
    } catch {
      toast.error("Token refresh failed ❌");
    }
  };

  // Copy token
  const copyToken = () => {
    navigator.clipboard.writeText(keycloak.token);
    toast.success("Token copied 📋");
  };

  return (
    <div className="p-6">
      <Toaster />

      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-6">⚙️ Settings</h2>

        {/* 👤 User Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">User Info</h3>

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
              {user?.preferred_username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.preferred_username}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div>
            <b>Roles:</b>
            <div className="flex gap-2 mt-2 flex-wrap">
              {roles.map((role) => (
                <span
                  key={role}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 🔐 Security */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Security</h3>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => keycloak.logout()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

            <button
              onClick={refreshToken}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Refresh Token
            </button>

            <button
              onClick={() => setShowToken(!showToken)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              {showToken ? "Hide Token" : "Show Token"}
            </button>
          </div>

          {showToken && (
            <div className="mt-4">
              <textarea
                readOnly
                value={keycloak.token}
                className="w-full p-3 border rounded-lg text-sm bg-gray-100 text-black"
                rows={6}
              />

              <button
                onClick={copyToken}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Copy Token
              </button>
            </div>
          )}
        </div>

        {/* 🎨 Appearance */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Appearance</h3>

          <div className="flex items-center gap-3">
            <span>Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg text-white ${
                darkMode ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              {darkMode ? "ON 🌙" : "OFF ☀️"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}