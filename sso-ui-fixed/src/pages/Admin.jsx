export default function Admin({ user }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-red-600">
        Admin Dashboard 🔐
      </h2>

      <p className="mb-6">
        Welcome Admin: <strong>{user?.username}</strong>
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Manage Users</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">System Logs</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Analytics</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Settings</h3>
        </div>
      </div>
    </div>
  );
}