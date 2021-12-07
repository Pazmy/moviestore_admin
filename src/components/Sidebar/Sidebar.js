import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #121828;
  width: 100%;
  height: 100vh;
  padding: 12px 16px;
  grid-row: 1/4;
  color: white;
`;
const Menu = styled.div`
  li:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;
const Sidebar = ({ user }) => {
  return (
    <Container>
      <div className="text-4xl font-bold mt-2 px-2 py-2">
        {user?.name ? user.name : "Admin"}
      </div>
      <Menu>
        <ul className="flex flex-col">
          <li className="rounded py-2 px-2">
            <Link to="/" className="text-white font-medium block">
              Dashboard
            </Link>
          </li>
          <li className="rounded py-2 px-2">
            <Link to="/users" className="text-white font-medium block">
              Users
            </Link>
          </li>
          <li className="rounded py-2 px-2">
            <Link to="/movies" className="text-white font-medium block">
              Movies
            </Link>
          </li>
          <li className="rounded py-2 px-2">
            <Link to="/orders" className="text-white font-medium block">
              Orders
            </Link>
          </li>
        </ul>
      </Menu>
    </Container>
  );
};

export default Sidebar;
