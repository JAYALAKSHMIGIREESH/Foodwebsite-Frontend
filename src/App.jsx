import "./App.css";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import { ToastContainer} from 'react-toastify';
import CheckOut from "./pages/CheckOut";


export const backendUrl = "https://foodwebsite-backend-2.onrender.com"


const App=() =>{
  return (
    <div>
       <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
       />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Auth insideRegister={false} />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
      </Routes>
      <Footer />
      </div>

  );
}

export default App;
