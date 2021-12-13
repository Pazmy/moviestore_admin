import React from "react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { admin } from "../../helper/axios";

const Container = styled.div`
  padding: 20px 35px;
`;
const Content = styled.div`
  background-color: #d5d9e1;
  padding: 24px;
  margin-bottom: 18px;
  height: auto;
`;
const AddActor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [placeofbirth, setPlaceofbirth] = useState("");
  const [biography, setBiography] = useState("");
  const [character, setCharacter] = useState("");
  const [file, setFile] = useState();

  function handlerChange(e, fieldName) {
    switch (fieldName) {
      case "name":
        setName(e.target.value);
        break;

      case "gender":
        setGender(e.target.value);
        break;
      case "birthday":
        setBirthday(e.target.value);
        break;
      case "placeofbirth":
        setPlaceofbirth(e.target.value);
        break;
      case "biography":
        setBiography(e.target.value);
        break;
      case "character":
        setCharacter(e.target.value);
        break;

      case "image":
        setFile(e.target.files);
        break;
      default:
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();

    data.append("MovieId", id);
    data.append("name", name);
    data.append("gender", gender);
    data.append("birthday", birthday);
    data.append("biography", biography);
    data.append("placeofbirth", placeofbirth);
    data.append("character", character);
    data.append("image", file[0]);
    console.log(data.get("image"));

    admin
      .post("/actors/add", data)
      .then((res) => {
        console.log(res.data);
        navigate(`/movie/detail/${id}`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <Container>
      <Content className="rounded px-4 py-8">
        <form className="flex">
          <div className="mr-4">
            <label htmlFor="name" className="block my-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="py-2 px-2 rounded w-80"
              value={name}
              onChange={(e) => handlerChange(e, "name")}
            />

            <label htmlFor="" className="block my-2">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              className="py-2 px-2 rounded w-80"
              value={gender}
              onChange={(e) => handlerChange(e, "gender")}
            />
            <label htmlFor="" className="block my-2">
              Place of birth
            </label>
            <input
              type="text"
              name="placeofbirth"
              className="py-2 px-2 rounded w-80"
              value={placeofbirth}
              onChange={(e) => handlerChange(e, "placeofbirth")}
            />
            <label htmlFor="" className="block my-2">
              Biography
            </label>
            <input
              type="text"
              name="biography"
              className="py-2 px-2 rounded w-80"
              value={biography}
              onChange={(e) => handlerChange(e, "biography")}
            />
            <label htmlFor="" className="block my-2">
              Birthday
            </label>
            <input
              type="text"
              name="birthday"
              className="py-2 px-2 rounded w-80"
              value={birthday}
              onChange={(e) => handlerChange(e, "birthday")}
            />
            <label htmlFor="" className="block my-2">
              Character
            </label>
            <input
              type="text"
              name="character"
              className="py-2 px-2 rounded w-80"
              value={character}
              onChange={(e) => handlerChange(e, "character")}
            />
            <div>
              <p className="my-2">Upload image</p>
              <input
                type="file"
                className="block my-2"
                name="image"
                onChange={(e) => handlerChange(e, "image")}
              />
            </div>
            <input
              type="submit"
              className="p-2 bg-blue-400 cursor-pointer rounded"
              onClick={submitHandler}
            />
          </div>
        </form>
      </Content>
    </Container>
  );
};

export default AddActor;
