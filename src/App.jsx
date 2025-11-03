import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Posts from "./pages/Posts";
import Roadmaps from "./pages/Roadmaps";
import Repos from "./pages/Repos";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Landing from "./pages/Landing";


export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3030";

export default function App() {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/repos" element={<Repos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
