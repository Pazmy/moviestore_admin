import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { admin, SERVER_URL } from "../../helper/axios";
import defaultAvatar from "../../images/default-avatar.png";
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
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    admin.get("/users/").then((res) => {
      setUsers(res.data.results);
    });
  }, []);
  function handlerDelete(id) {
    admin
      .delete(`/users/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container>
      <h1 className="bold text-4xl my-2">List Users</h1>

      <Table className="table-auto">
        <thead>
          <tr>
            <th>No</th>

            <th className="w-1/2">Name</th>
            <th className="w-1/2">Email</th>
            <th className="w-1/2">Role</th>
            <th className="w-1/2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            const img = user.avatarpath
              ? `${SERVER_URL}/${user.avatarpath}`
              : defaultAvatar;

            return (
              <tr key={i}>
                <td>{(i += 1)}</td>
                <td className="flex items-center">
                  <img
                    src={img}
                    className="mr-2 rounded-full"
                    alt="avatar"
                    width="40px"
                    height="40px"
                  />
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-red-700 text-white  px-4 py-2 rounded"
                      onClick={() => handlerDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
