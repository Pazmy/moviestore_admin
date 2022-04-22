import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { admin } from "../../helper/axios";

const Container = styled.div`
  padding: 20px 35px;
  font-size: 40px;
  display: flex;

  gap: 50px;
  /* justify-content: center; */
  align-items: center;
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
      <div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z" />
          </svg>
        </div>
        Total Item: {info?.totalMovie}
      </div>
      <div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z" />
          </svg>
        </div>
        Total Order: {info?.totalOrder}
      </div>
      <div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
          </svg>
        </div>
        Total User: {info?.totalUser}
      </div>
    </Container>
  );
};

export default Dashboard;
