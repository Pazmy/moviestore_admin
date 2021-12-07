import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Users from "./components/Pages/Users";
import Movies from "./components/Pages/Movies";
import Orders from "./components/Pages/Orders";
import AddMovie from "./components/Pages/AddMovie";
import EditMovie from "./components/Pages/EditMovie";
import OrderDetail from "./components/Pages/OrderDetail";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Wrapper from "./components/Wrapper";
import DetailMovie from "./components/Pages/DetailMovie";
import AddActor from "./components/Pages/AddActor";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper user={user}>Dashboard</Wrapper>} />
        <Route
          path="/users"
          element={
            <Wrapper user={user}>
              <Users />
            </Wrapper>
          }
        />
        <Route
          path="/movies"
          element={
            <Wrapper user={user}>
              <Movies />
            </Wrapper>
          }
        />
        <Route
          path="/movie/detail/:id"
          element={
            <Wrapper user={user}>
              <DetailMovie />
            </Wrapper>
          }
        />
        <Route
          path="/orders"
          element={
            <Wrapper user={user}>
              <Orders />
            </Wrapper>
          }
        />
        <Route
          path="/orders/detail/:name"
          element={
            <Wrapper user={user}>
              <OrderDetail />
            </Wrapper>
          }
        />
        <Route
          path="/movies/add"
          element={
            <Wrapper user={user}>
              <AddMovie />
            </Wrapper>
          }
        />
        <Route
          path="/movie/detail/:id/actors/add"
          element={
            <Wrapper user={user}>
              <AddActor />
            </Wrapper>
          }
        />
        <Route
          path="/movies/edit/:id"
          element={
            <Wrapper user={user}>
              <EditMovie />
            </Wrapper>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
