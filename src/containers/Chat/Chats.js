import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/Navigation/Navigation";
import Messenger from "../Messenger/Messenger";
import axios from "axios";
import { url } from "../../ApiUrl.js";

const Chats = (props) => {
  const [state, setState] = useState({
    chats: [],
  });

  useEffect(async () => {
    const { data } = await axios.get(url + "/chat", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
console.log(data)
    setState((prevState) => {
      return {
        ...prevState,
        chats: data,
      };
    });
  }, []);

  const onClickConsultant = () => {};

  return (
    <>
      <NavigationBar chat history={props.history} />
      <div style={{ width: "50%" }}>
        <h3>Consultation Requests </h3>
        {state.chats.map((chat) => {
          return (
            <div
              key={chat._id}
              style={{ border: "1px solid black", cursor: "pointer" }}
            >
              <img
                width="200x"
                height="200px"
                style={{ borderRadius: "100px" }}
                src="https://sun9-66.userapi.com/impg/UuiXNBztRsvaco_9fQoAARXa2NquBJ1sJcyL7w/XtzlGJnQvG0.jpg?size=260x217&quality=95&sign=6c1bc5202f1b032e57b33dc61b469770&type=album"
              />
              <h1>{chat.user.fullname}</h1>
              <ul key={chat.user._id}>
                <li>{chat.user.fullname}</li>
                <li>{chat.user.country}</li>
                <li>{chat.user.dateBirth.split("T")[0]}</li>
                <li>
                  {chat.user.subjects.reduce(
                    (subjectsDescription, currentSubject) =>
                      currentSubject.name +
                      " " +
                      currentSubject.percent +
                      "% " +
                      currentSubject.level +
                      "\n",
                    ""
                  )}
                </li>
              </ul>
            </div>
          );
        })}
        {/* <Messenger/> */}
      </div>
    </>
  );
};

export default Chats;
