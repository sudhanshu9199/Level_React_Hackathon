import Navbar from "./components/Navbar/Navbar";
import MainRouter from "./router/MainRouter";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <div>
      <SearchProvider>
        <Navbar />
        <MainRouter />
      </SearchProvider>
    </div>
  );
};

export default App;
