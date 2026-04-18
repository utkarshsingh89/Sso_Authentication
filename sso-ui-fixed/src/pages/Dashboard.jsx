import { useEffect } from "react";
import keycloak from "../keycloak";

export default function Dashboard({ user }) {
  const isAdmin = user?.roles?.includes("admin");

  useEffect(() => {
    if (!keycloak.token) {
      console.log("⏳ Token not ready yet");
      return;
    }

    console.log("✅ TOKENparsed:", keycloak.tokenParsed);

    fetch("http://localhost:5000/secure", {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    })
      .then((res) => {
        console.log("STATUS:", res.status);
        return res.text();
      })
      .then((data) => console.log("DATA:", data))
      .catch((err) => console.error("ERROR:", err));

    // ✅ ONLY for admin
    if (isAdmin) {
      fetch("http://localhost:5000/admin", {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
        .then((res) => {
          console.log("ADMIN STATUS:", res.status);
          return res.text();
        })
        .then((data) => console.log("ADMIN DATA:", data));
    }
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <p className="mb-6 text-gray-600">
        Welcome, <span className="font-semibold">{user?.username}</span>
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl mt-2">1,245</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl mt-2">$12,340</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Performance</h3>
          <p className="text-2xl mt-2">89%</p>
        </div>
      </div>
    </div>
  );
}