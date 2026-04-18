export default function AdminRoute({ user, children }) {
  const isAdmin = user.roles?.includes("admin");

  if (!isAdmin) {
    return <h2 style={{ color: "red" }}>Access Denied ❌</h2>;
  }

  return children;
}