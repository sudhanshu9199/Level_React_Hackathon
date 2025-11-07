import Navbar from "./components/Navbar/Navbar";
import MainRouter from "./router/MainRouter";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <div>
      <SearchProvider>
        <CartProvider>
          <Navbar />
          <MainRouter />
        </CartProvider>
      </SearchProvider>
    </div>
  );
};

export default App;
