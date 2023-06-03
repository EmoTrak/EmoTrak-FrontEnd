import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IPayload } from "../data/type/type";
import { getCookie } from "../utils/cookies";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import Loading from "../components/Loading";
import * as PAGE from "../data/routes/urls";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Mypage from "../pages/Mypage";
import ImagePost from "../pages/ImagePost";
import DrawingPost from "../pages/DrawingPost";
import Detail from "../pages/Detail";
import DrawEdit from "../pages/DrawEdit";
import RedirectKakao from "../pages/RedirectKakao";
import RedirectNaver from "../pages/RedirectNaver";
import RedirectGoogle from "../pages/RedirectGoogle";
import Admin from "../pages/Admin";
import ImageEdit from "../pages/ImageEdit";

const Guide = lazy(
  () => import(/* webpackChunkName: "guide" */ "../pages/Guide")
);

const AdminPost = lazy(
  () =>
    import(
      /* webpackChunkName: "admin-post" */ "../features/admin/components/AdminPost"
    )
);
const AdminComment = lazy(
  () =>
    import(
      /* webpackChunkName: "admin-comment" */ "../features/admin/components/AdminComment"
    )
);
const Community = lazy(
  () => import(/* webpackChunkName: "communiy" */ "../pages/Community")
);
const CommunityDetail = lazy(
  () =>
    import(
      /* webpackChunkName: "community-detail" */ "../pages/CommunityDetail"
    )
);
const Chart = lazy(
  () => import(/* webpackChunkName: "chart" */ "../pages/Chart")
);
const Home = lazy(
  () => import(/* webpackChunkName: "calendar" */ "../pages/Home")
);

const Router = () => {
  const token = getCookie("token");
  let payloadJson;
  let payload!: IPayload;
  const payloadB64 = (token || "").split(".")[1];
  if (atob && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson) {
    payload = JSON.parse(payloadJson);
  }
  const pages = [
    {
      pathname: "/",
      element: <Guide />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.LOGIN_PAGE,
      element: <Login />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.PRIVACY_POLICY,
      element: <PrivacyPolicy />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.SIGN_UP_PAGE,
      element: <Signup />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.HOME_PAGE,
      element: <Home />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.MY_PAGE,
      element: <Mypage />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: `${PAGE.IMAGE_POST_PAGE}/:date`,
      element: <ImagePost />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: `${PAGE.DRAW_POST_PAGE}/:date`,
      element: <DrawingPost />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: `${PAGE.DETAIL_PAGE}/:id`,
      element: <Detail />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: `${PAGE.IMAGE_EDIT_PAGE}/:id`,
      element: <ImageEdit />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: `${PAGE.DRAW_EDIT_PAGE}/:id`,
      element: <DrawEdit />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.CHART_PAGE,
      element: <Chart />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.COMMUNITY_PAGE,
      element: <Community />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: `${PAGE.COMMUNITY_DETAIL}/:id`,
      element: <CommunityDetail />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.OAUTH_KAKAO,
      element: <RedirectKakao />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.OAUTH_NAVER,
      element: <RedirectNaver />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.OAUTH_GOOGLE,
      element: <RedirectGoogle />,
      isPublic: true,
      isLogin: false,
      isAuthAdmin: false,
    },
    {
      pathname: PAGE.ADMIN,
      element: <Admin />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: true,
    },
    {
      pathname: PAGE.ADMIN_POST,
      element: <AdminPost />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: true,
    },
    {
      pathname: PAGE.ADMIN_COMMENT,
      element: <AdminComment />,
      isPublic: false,
      isLogin: true,
      isAuthAdmin: true,
    },
  ];

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            {pages.map((page) => {
              const isAuthAdmin = page.isAuthAdmin;

              return (
                <Route
                  key={page.pathname}
                  path={page.pathname}
                  element={
                    <ProtectedRoute
                      token={token}
                      pathname={page.pathname}
                      admin={payload?.auth}
                      isAuthAdmin={isAuthAdmin}
                      isLogin={page.isLogin}
                      isPublic={page.isPublic}
                    >
                      {page.element}
                    </ProtectedRoute>
                  }
                />
              );
            })}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
