import { FormEvent, useRef, useState } from "react";
import loadingGif from "/loading.gif";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, showError] = useState(false);
  const errorMsg = useRef("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:6969/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 200) {
        localStorage.setItem("email", email);

        if (localStorage.getItem("token")) {
          window.location.replace("/welcome");
        } else {
          window.location.replace("/verification");
        }
      } else {
        setLoading(false);
        if (res.status === 401) {
          errorMsg.current = "Incorrect Password";
        } else {
          errorMsg.current = "User doesn't exist";
        }
        showError(true);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 mt-5 justify-center items-center w-full"
    >
      <h1 className="text-4xl font-semibold py-5 my-8 px-10 bg-gray-900 rounded-md text-center">
        Login
      </h1>
      <label htmlFor="email" className="w-1/5 h-9">
        <input
          type="text"
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
      {loading ? (
        <img src={loadingGif} className="w-20 h-20" />
      ) : (
        <button
          type="submit"
          className="bg-blue-500 py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      )}
      {error ? (
        <span className="text-red-500 font-semibold">{errorMsg.current}</span>
      ) : null}
    </form>
  );
}
