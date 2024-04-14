import { useEffect, useState } from "react";

const token = localStorage.getItem("token");

export default function Welcome() {
  const [user, setUser] = useState<{
    name: string;
  }>({ name: "" });

  if (!token || token === "") {
    return (
      <span className="text-red-500 text-4xl font-semibold mt-10">
        Please Log In
      </span>
    );
  }

  console.log(token);

  async function fetchUser() {
    try {
      const res = await fetch("http://localhost:6969/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="mt-6 flex-flex-col">
      <h1 className="text-4xl font-semibold py-5 my-8 px-10 bg-gray-900 rounded-md text-center">
        Login successful, welcome {user.name}
      </h1>
    </div>
  );
}
