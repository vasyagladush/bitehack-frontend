import React from "react";
import axios from "axios";
import { url } from "../../ApiUrl.js";
import styled from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  margin-left: calc(100vw - 22%);
  width: 20%;
  height: 30px;
`;

const UpdateChatStatusButton = (props) => {
  const handleClick = async () => {
    const response = await axios.put(
      url + `/chat/${props.chatId}`,
      { status: props.status },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  return <StyledButton onClick={handleClick}>{props.children}</StyledButton>;
};

export default UpdateChatStatusButton;
