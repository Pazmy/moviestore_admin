import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { admin } from "../../helper/axios";
import { formatter } from "../../helper/formatter";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px 35px;
`;
const Table = styled.table`
  &,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    padding: 8px 8px;
  }
  td {
    padding: 8px 8px;
  }
`;
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    admin
      .get("/orders/")
      .then((res) => {
        setOrders(res.data.results);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <Container>
      <h1 className="bold text-4xl mb-2">List Orders</h1>
      <Table className="table-auto">
        <thead>
          <tr>
            <th>No</th>
            <th className="w-1/4">Order Name</th>
            <th className="w-1/4">Status</th>
            <th className="w-1/2">Date</th>
            <th className="w-1/2">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => {
            return (
              <tr key={i}>
                <td>{(i += 1)}</td>
                <td className="text-blue-600">
                  <Link to={`/orders/detail/${order.name}`}>{order.name}</Link>
                </td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toString().slice(0, 15)}</td>
                <td>{formatter.format(order.total)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Orders;
