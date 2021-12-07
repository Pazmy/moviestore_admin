import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

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
const Wrapper = ({ children, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);
  return (
    <Container>
      <Header user={user} />
      <Sidebar user={user} />
      <Content>{children}</Content>
    </Container>
  );
};

export default Wrapper;
