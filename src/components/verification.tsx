import { FormEvent, useEffect, useState } from "react";

export default function Verification() {
  const [otp, setOTP] = useState("");
  const email = localStorage.getItem("email");

  if (!email || email === "") {
    return <h1 className="text-red-500">Email not found</h1>;
  }

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:6969/waitqr/${email}`);
    ws.addEventListener("message", (event) => {
      try {
        handleToken(JSON.parse(event.data).token);
      } catch (e) {
        console.log(e);
      }
    });

    return () => {
      console.log("closing websocket");
      ws.close();
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:6969/verifyotp/${email}/${otp}`
      );
      console.log(res.status);

      if (res.status === 200) {
        handleToken((await res.json()).token);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleToken(token: string) {
    localStorage.setItem("token", token);
    window.location.replace("/welcome");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-4xl font-semibold py-5 my-8 px-10 bg-gray-900 rounded-md text-center">
        2-Factor Authentication
      </h1>
      <label htmlFor="otp" className="flex gap-2">
        Enter the OTP or scan the QR Code sent to your registered email:
        <input
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          className="text-center text-black"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
