import { Provider, useDispatch } from "react-redux";
import store from "./Redux/store";
import Navbar from "./components/Navbar/Navbar";
import MainRouter from "./router/MainRouter";
import { SearchProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import { initializeAuth } from "./Redux/Slice/authSlice";
import "react-toastify/dist/ReactToastify.css";
import "./toastStyle.css";
import { useEffect } from "react";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return null;
};

const App = () => {
  return (
    <Provider store={store}>
      <SearchProvider>
        <AuthInitializer />
        <Navbar />
        <MainRouter />
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="luxury-toast"
          bodyClassName="luxury-toast-body"
          progressClassName="luxury-progress"
        />
      </SearchProvider>
    </Provider>
  );
};

export default App;
