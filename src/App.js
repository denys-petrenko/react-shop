import './App.css';
import AppRoutes from "./Components/Routes/Routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "./Components/features/categories/categoriesSlice";
import {getProducts} from "./Components/features/products/productsSlice";
import UserForm from "./Components/User/UserForm";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getCategories());
      dispatch(getProducts());
  }, [dispatch]);

    return (
    <div className="App">
        <Header />
        <UserForm/>
        <div className="container">
            <Sidebar />
            <AppRoutes />
        </div>
        <Footer />
    </div>
  );
}

export default App;
