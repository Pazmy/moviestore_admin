import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { admin } from "../../helper/axios";

const Container = styled.div`
  padding: 20px 35px;
  font-size: 40px;
`;
const Dashboard = ({ user }) => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const token = `Bearer ${user?.token}`;
    admin
      .get("/users/admin/dashboard", { headers: { Authorization: token } })
      .then((res) => {
        setInfo(res.data.result);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [user?.token]);
  return (
    <Container>
      <div>Total User: {info?.totalUser}</div>
      <div>Total Order: {info?.totalOrder}</div>
      <div>Total Item: {info?.totalMovie}</div>
    </Container>
  );
};

export default Dashboard;
