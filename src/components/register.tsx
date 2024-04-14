import { FormEvent, useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:6969/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res.status);
      if (res.status != 200) {
        setShowError(true);
      } else {
        setShowError(false);
        window.location.replace("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 mt-5 justify-center items-center w-full"
    >
      <h1 className="text-4xl font-semibold py-5 my-8 px-10 bg-gray-900 rounded-md text-center">
        Register
      </h1>
      <label htmlFor="email" className="w-1/5 h-9">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-full rounded-md text-center text-black text-lg"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="email" className="w-1/5 h-9">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-full rounded-md text-center text-black text-lg"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="password" className="w-1/5 h-9">
        <input
          type="password"
          value={password}
          className="w-full h-full rounded-md text-center text-black text-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
      {showError ? (
        <span className="text-red-500 font-semibold">Email already exists</span>
      ) : null}
    </form>
  );
}
