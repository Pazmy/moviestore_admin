import React from "react";
import styled from "styled-components";
import logo from "./logo.jpg";
const Container = styled.div`
  width: 100%;

  grid-column: 2/5;
`;
const Header = () => {
  return (
    <Container>
      <div className="shadow px-2 py-2 flex justify-end">
        <img
          src={logo}
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
