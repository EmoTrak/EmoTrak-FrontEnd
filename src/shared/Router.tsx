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
import Edit from "../pages/Edit";
import Admin from "../pages/Admin";
import AdminUser from "../features/Admin/AdminUser";
import AdminPost from "../features/Admin/AdminPost";
import Layout from "../layouts/Layout";
import Members from "../pages/Members";
import Mypage from "../pages/Mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/image-post/:date" element={<ImagePost />} />
          <Route path="/draw-post/:date" element={<DrawingPost />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/members" element={<Members />} />
          <Route path="/oauth/kakao" element={<RedirectKakao />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpost" element={<AdminPost />} />
          <Route path="/adminuser" element={<AdminUser />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
