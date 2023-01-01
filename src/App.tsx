import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Dashboard from "./components/dashboard";
import Ticket from "./components/ticket";
import Order from "./components/order";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  const userData = useSelector((state: any) => state.user);
  console.log(userData);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {userData?.data?._id && (
          <>
            <Route path="ticket" element={<Ticket />} />
            <Route path="order" element={<Order />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
