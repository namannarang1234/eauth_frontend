import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/index";
import Login from "./components/login";
import Register from "./components/register";
import Verification from "./components/verification";
import Welcome from "./components/welcome";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full bg-gray-700 flex flex-col items-center text-white">
        <div className="text-center text-5xl py-8 font-semibold w-full bg-gray-800">
          <span>E-Authentication using OTP and QR code</span>
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
