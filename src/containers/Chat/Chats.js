import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/Navigation/Navigation";
import UpdateChatStatusButton from "../../components/ChatButtons/UpdateChatStatusButton";
import axios from "axios";
import { url } from "../../ApiUrl.js";
import openSocket from "socket.io-client";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const socket = openSocket(url);
const Chats = (props) => {
  const [state, setState] = useState({
    chats: [],
  });
  const [input,setInput] = useState("");


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
    socket.emit('connect');
    socket.on("message",(data)=>{
      console.log(data);
      if(data.userSender && data.consultant._id == props.user._id){
        props.addMessage({
          sender: data.user._id,
          message: data.message
        })
      }
    });
  }, []);

  const onClickChat=async (chat) => {
    const response = await axios.get(url+"/chat/user/"+chat.user._id,{
      headers: {
        "Authorization": "Bearer "+ localStorage.getItem("token")
      }
    });

    props.setMessages(response.data.messages);
    props.setUser(response.data.user);
  };
  const handleInput = (event)=>{ 
    setInput(event.target.value);
  }; 
  
  const sendMessage = async()=>{
    const response = await axios.post(url+"/chat/message",{
      personId: props.user,
      message: input
    },{
      headers: {
        "Authorization": "Bearer "+localStorage.getItem("token")
      }
    });

    console.log(response.data);

    props.addMessage({sender: response.data.consultant._id,
      message: response.data.message
    })

  };

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
              onClick={()=>onClickChat(chat)}
            >
              <img
                width="200x"
                height="200px"
                style={{ borderRadius: "100px" }}
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
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
        {
                props?.messages.length ?
                <>
                <div style={{overflowY: 'auto',height: '300px',width: "500px"}}>
                   {props.messages.map(message=>{
              return (
                <p key={message._id} style={{marginTop: '10px'}}>{message.sender}: {message.message}</p>
              )
            })}

             
                </div>
                <input type="text" onChange={handleInput} value={input}/>
            <button onClick={sendMessage}>Send Text</button>   
                </> : null
              }
           
        {/* <Messenger/> */}
      </div>
    </>
  );
};

const mapStateToProps = state =>{
  return {
      consultant: state.consultant,
      messages: state.messages,
      user: state.user,
      amIConsultant: state.amIConsultant
  }
};

const mapDispatchToProps = dispatch=>{
  return {
      setMessages: (messages)=>dispatch(actions.setMessages(messages)),
      addMessage: (data)=>dispatch(actions.addMessage(data)),
      setUser: (user)=>dispatch(actions.setUser(user)),
      setConsultant: (consultant)=>dispatch(actions.setConsultant(consultant)),
      setAmIConsultant: ()=>dispatch(actions.setAmIConsultant())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Chats);
