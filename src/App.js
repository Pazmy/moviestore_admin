import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import styled from "styled-components";
import Users from "./components/Pages/Users";
import Movies from "./components/Pages/Movies";
import Orders from "./components/Pages/Orders";
import AddMovie from "./components/Pages/AddMovie";
const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr 1fr;
  grid-template-rows: 60px 200px 320px;
  width: 100%;
`;
const Content = styled.div`
  grid-row: 2/4;
  grid-column: 2/5;
  /* overflow-y: auto;
  overflow-x: auto; */
  overflow: auto;
`;
function App() {
  return (
    <Router>
      <Container>
        <Sidebar />
        <Header />
        <Content>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/movies/add" element={<AddMovie />} />
          </Routes>
        </Content>
      </Container>
    </Router>
  );
}

export default App;
