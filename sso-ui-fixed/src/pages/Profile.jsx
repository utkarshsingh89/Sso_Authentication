export default function Profile({ user }) {
  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  const username = user.username || user.preferred_username;
  const email = user.email || "Not provided";
  const roles = user.roles || user.realm_access?.roles || [];

  return (
    <div className="p-6">
      
      {/* Card */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {username?.[0]?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{username}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="mb-6" />

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{email}</p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-2">Roles</p>

            <div className="flex flex-wrap gap-2">
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

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>

          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
}