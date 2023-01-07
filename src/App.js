import logo from './logo.svg';
import './App.css';
import Register from './onboard/Register';
import { BrowserRouter, Route, Routes,useRoutes } from "react-router-dom";
import Signin from './onboard/Signin';
import Resetpassword from './onboard/Resetpassword';
import Updatepassword from './onboard/Updatepassword';
import Data from './onboard/Data';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Analytics from './pages/Analytics.jsx';
import Comment from './pages/Asset.jsx';
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';
import VerifyEmail from './pages/VerifyEmail.js';


function App() {

  return (
    <>

        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='signin' element={<Signin />} />
          <Route path='forget-password' element ={<Resetpassword />} />
          <Route path='update-password' element={<Updatepassword />} />
          <Route path='/brand-data' element={<Data />} />
          <Route path='/user/verify-email' element={ <VerifyEmail /> } />
          </Routes>
          {<Sidebar>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collections" element={<About />} />
          <Route path="/asset" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          </Routes>
          </Sidebar> }
          </>
        
  );
}

export default App;
