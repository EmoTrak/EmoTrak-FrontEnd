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
import Layout from "../layouts/Layout";
import Members from "../pages/Members";
import Mypage from "../pages/Mypage";
import AdminComment from "../features/admin/components/AdminComment";
import AdminPost from "../features/admin/components/AdminPost";
import RedirectNaver from "../pages/RedirectNaver";

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
          <Route path="/oauth/naver" element={<RedirectNaver />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpost" element={<AdminPost />} />
          <Route path="/admincomment" element={<AdminComment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
