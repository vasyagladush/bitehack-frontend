import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/Navigation/Navigation";
import UpdateChatStatusButton from "../../components/ChatButtons/UpdateChatStatusButton";
import axios from "axios";
import { url } from "../../ApiUrl.js";

const Chats = (props) => {
  const [state, setState] = useState({
    chats: [],
  });

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axios.get(url + "/chat", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setState((prevState) => {
        return {
          ...prevState,
          chats: data,
        };
      });
    };

    fetchChats().catch(console.error);
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
                <li>Status: {chat.status}</li>
                <li>{chat.user.fullname}</li>
                <li>{chat.user.country}</li>
                <li>{chat.user.dateBirth.split("T")[0]}</li>
                <li>
                  {chat.user.subjects.map((subject) => (
                    <p>
                      {subject.name +
                        " " +
                        subject.percent +
                        " " +
                        subject.level}
                    </p>
                  ))}
                </li>
              </ul>
              <UpdateChatStatusButton status="closed" chatId={chat._id}>
                Mark as Closed
              </UpdateChatStatusButton>
              <UpdateChatStatusButton
                status="awaitingConsultantResponse"
                chatId={chat._id}
              >
                Mark as Awaiting Consultant's Response
              </UpdateChatStatusButton>
            </div>
          );
        })}
        {/* <Messenger/> */}
      </div>
    </>
  );
};

export default Chats;
