import logo from "./logo.svg";
import "./App.css";
import Register from "./onboard-brand/Register";
import RegisterAdmin from "./onboard-admin/Register";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import Signin from "./onboard-brand/Signin";
import Resetpassword from "./onboard-brand/Resetpassword";
import Updatepassword from "./onboard-brand/Updatepassword";
import Data from "./onboard-brand/Data";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Analytics from "./pages/Analytics.jsx";
import Comment from "./pages/Asset.jsx";
import Product from "./pages/Product.jsx";
import ProductList from "./pages/ProductList.jsx";
import VerifyEmail from "./pages/VerifyEmail.js";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import ManageAssets from "./Asset_components/ManageAssets";
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from "./pages/Upload"
import Upload1 from './Asset_components/Upload'
import Assetedit from "./Asset_components/Assetedit";
import Dashboard1 from "./New-src/Dashboard/Dashboard/Dashboard";
import 'swiper/css';
import ChatBody from "./components/chatBody/ChatBody";
import AdminDashboard from "./New-src/AdminDashboard/AdminDashboard";
import AdminBrand from "./New-src/AdminDashboard/Pages/AdminPage/Dashboard";

function App() {
  const CLIENT_ID = "502666256532-09c3r3cfdh8028t1n3lrl69hpeaq000v.apps.googleusercontent.com"

  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId:CLIENT_ID,
        scope:''
      })
    }
    gapi.load('client:auth2',start)
  })

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/admin/signup" element={<RegisterAdmin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forget-password" element={<Resetpassword />} />
        <Route path="/update-password" element={<Updatepassword />} />
        <Route path="/brand-data" element={<Data />} />
        <Route path="/user/verify-email" element={<VerifyEmail />} />
      </Routes>
    {
      <Sidebar>
        <Routes>
          <Route path="/" exact element={<Dashboard1 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collections" element={<About />} />
          <Route path="/asset" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/:brands/assets" element={<ManageAssets />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/:brands/:assetName1/view" element={<Upload1 />} />
          <Route path="/admin/upload" element={<Upload role="admin" />} />
          <Route path="/:brands/:assetName1/edit" element={<Assetedit />} />
          <Route path="/support" element={<ChatBody />} />
          <Route path="/admin/brands" element={<AdminDashboard />} />
          <Route path="/admin/:brand/assets" element={<AdminBrand />} />
        </Routes>
      </Sidebar>
    }
    </>
  );
}

export default App;
