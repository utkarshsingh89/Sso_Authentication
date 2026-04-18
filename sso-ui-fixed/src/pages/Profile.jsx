export default function Profile({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email || "Not provided"}</p>
    </div>
  );
}