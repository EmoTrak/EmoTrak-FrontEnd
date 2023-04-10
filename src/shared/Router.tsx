import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import ImagePost from "../pages/ImagePost";
import DrawingPost from "../pages/DrawingPost";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import CommunityDetail from "../pages/CommunityDetail";
import Chart from "../pages/Chart";
import RedirectKakao from "../pages/RedirectKakao";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/image-post/:date" element={<ImagePost />} />
        <Route path="/draw-post/:date" element={<DrawingPost />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/oauth/kakao" element={<RedirectKakao />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
