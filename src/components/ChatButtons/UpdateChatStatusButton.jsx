import React from "react";
import axios from "axios";
import { url } from "../../ApiUrl.js";
import {Button} from 'react-bootstrap';
import classes from '../../containers/Panel/Panel.module.css';

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

  return (
    <Button variant="dark" className={classes.Button} onClick={handleClick}>
      {props.children}
    </Button>
  );
};

export default UpdateChatStatusButton;
