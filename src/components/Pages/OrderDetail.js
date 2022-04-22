import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { admin } from "../../helper/axios";
import { formatter } from "../../helper/formatter";
import Loader from "../Loader/Loader";

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
const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const { name } = useParams();
  // const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    admin
      .get(`/orders/detail/${name}`)
      .then((res) => {
        setOrder(res.data.result);
        // setStatus(res.data.result.status);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setLoading(false);
  }, [name]);

  // function handleStatus(e) {
  //   setStatus(e.target.value);
  //   const tempStatus = e.target.value;
  //   admin
  //     .post("/orders/status", { status: tempStatus, id: order.id })
  //     .then((res) => {
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Loader style={{ width: "100px", height: "100px" }} />
      </div>
    );
  } else {
    return (
      <Container>
        <h1 className="bold text-4xl mb-2">${order.name}</h1>
        <div className="w-80 mb-2">
          {/* <div>
            <form>
              <label htmlFor="status" className="mr-2">
                Status:
              </label>
              <select
                className="border-black border"
                name="status"
                value={status}
                onChange={(e) => handleStatus(e)}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </form>
          </div> */}
          <div>
            <span className="mr-2">Date:</span>
            <span>{new Date(order.createdAt).toString().slice(0, 15)}</span>
          </div>

          <div>
            <span className="mr-2">Quantity:</span>
            <span>{order.quantity}</span>
          </div>
          <div>
            <span className="mr-2">Total:</span>
            <span>{formatter.format(order.total)}</span>
          </div>
          <div>
            <span className="mr-2">Email:</span>
            <span>{order.User?.email}</span>
          </div>
          <div>
            <span className="mr-2">Name:</span>
            <span>{order.User?.name}</span>
          </div>
        </div>

        <h2 className="bold text-2xl mb-2">Item</h2>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th className="w-1/2">Title</th>

              <th className="w-1/2">Image</th>
              <th className="w-1/2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order?.movies?.map((movie, i) => {
              return (
                <tr key={movie.id}>
                  <td>{(i += 1)}</td>
                  <td>{movie.title}</td>
                  <td>
                    <img
                      className="inline-block"
                      src={movie.poster}
                      alt={movie.title}
                      width="80px"
                    />
                  </td>
                  <td>{formatter.format(movie.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
};

export default OrderDetail;
