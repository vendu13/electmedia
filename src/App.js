import { CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import Admin from "./pages/Admin pages/Admin/Admin";
// import MiniDrawer from './pages/Drawer'
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import CategoryTable from './pages/Category/Category'
import ArticleTable from "./pages/Admin pages/Article/Article";
import PrivacyTable from "./pages/Admin pages/Privacy/Privacy";
import SocialList from "./pages/Admin pages/SocialList/SocialList";
import Login from "./pages/Admin pages/Login/Login";
import CategoryTable from "./pages/Admin pages/Category/Category";
import AddCategory from "./pages/Admin pages/Category/AddCategory";
import AddSocialLinks from "./pages/Admin pages/SocialList/AddSocialLinks";
import AddPrivacyTerms from "./pages/Admin pages/Privacy/AddPrivacyTerms";
import AddArticle from "./pages/Admin pages/Article/AddArticle";
import { useDispatch, useSelector } from "react-redux";
import { check } from "./Store/Action/AdminActions/AuthActions/AuthActions";
import Loader from "./Components/Loader/Loader";
import EditPrivacyTerms from "./pages/Admin pages/Privacy/editPrivacy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Components/ProtectedRoute";
// import Home from "./pages/Home/Layout";
import Layout from "./pages/Home/Layout";
import CardBox from "./Components/Cards/CardBox";
import Home_layout from "./Components/Home_layout/Home_layout";
import Category_layout from "./Components/Category_Layout/Category_layout";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import SearchPage from "./pages/SearchPage/SearchPage";
import Tnc from "./pages/PrivacyPolicy/Tnc";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CheckaCategory from "./pages/CheckCategory/CheckaCategory";
// import SocialList from './pages/Admin pages/SocialList/SocialList';
function App() {
  const { isAuthenticated, isnavloading } = useSelector(
    (state) => state.adminAuth
  );

  return (
    // <MiniDrawer/>
    // <div>app</div>
    <ThemeProvider theme={theme}>
      {/* {console.log("reder")} */}

      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home_layout />} />
          {/* <Route path="about_us" element={<div>about us</div>}/> */}

          <Route
            path="tnc"
            element={<Tnc/>}
          />
          <Route path="privacy_Policy" element={<PrivacyPolicy />} />
          <Route path="search" element={<Outlet />}>
            <Route index element={<SearchPage/>}/>
            <Route path=":id" element={<ArticleDetails />} />
          </Route>
          <Route path="*" element={<Navigate to={"/404"} replace />} />
        </Route>
        <Route path={"/category"} element={<Layout />}>
          <Route path=":label" element={
          <CheckaCategory> 
             <Category_layout />
          </CheckaCategory>
         
          } />
          <Route path=":label/:id" element={<ArticleDetails />} />
        </Route>
        <Route path="/404" element={<Layout />}>
          <Route index element={<PageNotFound/>} />
        </Route>

        {/* <Route path="/login"element={<Login/>} /> */}
        <Route path="/api/v1/admin/login" element={<Login />} />
        <Route
          path="/api/v1/admin"
          element={
            <Protected isLoggedIn={isAuthenticated}>
              <Admin />
            </Protected>
          }
          // !isAuthenticated ? <Login /> : <Admin />}
        >
          <Route path="category" element={<Outlet />}>
            <Route
              index
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <CategoryTable />
                </Protected>
              }
            />

            <Route
              path="add"
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <AddCategory />
                </Protected>
              }
            />
          </Route>
          <Route path="contacts" element={<Outlet />}>
            <Route
              index
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <SocialList />
                </Protected>
              }
            />

            <Route
              path="add"
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <AddSocialLinks />
                </Protected>
              }
            />
          </Route>
          <Route
            path="article"
            element={
              <Protected isLoggedIn={isAuthenticated}>
                <Protected isLoggedIn={isAuthenticated}>
                  <AddArticle />
                </Protected>
              </Protected>
            }
          />
          <Route path="privacy" element={<Outlet />}>
            <Route
              index
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <PrivacyTable />
                </Protected>
              }
            />

            <Route
              path="edit/:id"
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <EditPrivacyTerms />
                </Protected>
              }
            />
            <Route
              path="add"
              element={
                <Protected isLoggedIn={isAuthenticated}>
                  <AddPrivacyTerms />
                </Protected>
              }
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
