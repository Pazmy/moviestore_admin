import React from "react";
import styled from "styled-components";
import { SERVER_URL } from "../../helper/axios";
import defaultAVatar from "../../images/default-avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;

  grid-column: 2/5;
`;
const Header = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout(null));
    navigate("/login");
  }

  return (
    <Container>
      <div className="shadow px-2 py-2 flex justify-end">
        <button className="mr-4" onClick={handleLogout}>
          Log Out
        </button>
        <img
          src={
            user?.avatarpath
              ? `${SERVER_URL}/${user.avatarpath}`
              : defaultAVatar
          }
          className="rounded-full"
          width="40px"
          height="40px"
          alt="user"
        />
      </div>
    </Container>
  );
};

export default Header;
