import { Provider } from "react-redux";
import store from "./Redux/store";
import Navbar from "./components/Navbar/Navbar";
import MainRouter from "./router/MainRouter";
import { SearchProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastStyle.css";

const App = () => {
  return (
    <Provider store={store}>
      <SearchProvider>
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
