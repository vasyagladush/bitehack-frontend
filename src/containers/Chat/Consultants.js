import React, { useEffect, useState, useRef } from "react";
import NavigationBar from "../../components/Navigation/Navigation";
import Messenger from "../Messenger/Messenger";
import axios from "axios";
import { url } from "../../ApiUrl.js";
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { getByDisplayValue } from "@testing-library/react";
import openSocket from "socket.io-client";
import ContentWrapper from "../../components/ContentWrapper";

const socket = openSocket(url);
const Consultants = (props) => {
  const messagesEndRef = useRef(null);
  const [state, setState] = useState({
    consultants: [],
    showMessages: false
  });

  const [input,setInput]= useState("");

  const scrollToBottom = ()=>{
    messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(scrollToBottom,[props.messages]); // scroll if our messages are changed


  useEffect(() => {
    const fetchConsultants = async () => {
      const { data } = await axios.get(url + "/consultant", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setState((prevState) => {
        return {
          ...prevState,
          consultants: data,
        };
      });
    };

    fetchConsultants().catch(console.error);
    socket.emit("connect");
    socket.on("message",(data)=> { 
      // console.log(data.userSender);
      // console.log(data.user._id,props.user);
      if(!data.userSender && data.user._id == props.user._id){ // and message for this exact user
        // console.log(data);
        props.addMessage({
        message: data.message,
        sender: data.consultant._id
      });
     }
  });
  }, []);

  const onClickConsultant = async(consultant) => {
    const response = await axios.get(url+"/chat/"+consultant._id.toString(),{ 
      headers: {
        "Authorization": "Bearer "+ localStorage.getItem("token")
      }
    });

    if(response.data?.messages.length){
      props.setMessages(response.data.messages);
      props.setConsultant(response.data.consultant);
    }
    else {
      setState(prevState=>{
        return {
          ...prevState,
          showMessages: true
        }
      });
      console.log(consultant);
      props.setConsultant(consultant._id);
    }


  };

  const handleInput = (event)=>{
    setInput(event.target.value);
  }


  const sendMessage = async()=>{ 
    const response = await axios.post(url+'/chat/message',{
      personId: props.consultant,
      message: input
  },{
      headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
      }
  });

  props.addMessage({
    sender: response.data.userSender ? response.data.user._id : response.data.consultant._id,
    message: response.data.message
  });
  setInput("");
  };

  return (
    <>
      <NavigationBar chat history={props.history} />
      <div style={{ width: "50%" }}>
        <ContentWrapper>
        {state.consultants.map((consultant) => {
          return (
            <div
              key={consultant._id}
              style={{ border: "1px solid black", borderRadius: "10px", cursor: "pointer" }}
              onClick={()=> onClickConsultant(consultant)}
            >
              <img
                width="200x"
                height="200px"
                style={{ borderRadius: "100px" }}
                src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg"
              />
              <p>Debug ID: {consultant._id}</p>
              <h1>{consultant.fullname}</h1>
              {consultant.universities.map((university) => {
                return (
                  <ul key={university._id}>
                    <li>{university.name}</li>
                    <li>{university.location}</li>
                  </ul>
                );
              })}
            </div>
          );
        })}

        {props.messages.length ? 
          <div style={{border: '1px solid black', borderRadius: "10px", width: '500px',height:'500px',overflowY: 'auto'}}>
            {props.messages.map(message=>{
              return (
                <p style={{marginTop: '10px'}}>{message.sender}: {message.message}</p>
              )
            })}

            <input type="text" onChange={handleInput} value={input}/>
            <button onClick={sendMessage}>Send Text</button>    

          </div> : state.showMessages ? 
          <div style={{border: '1px solid black', borderRadius: "10px", width: '500px',height:'500px',overflowY: 'auto'}}>
          {props.messages.map(message=>{
            return (
              <p style={{marginTop: '10px'}}>{message.sender}: {message.message}</p>
            )
          })}

          <input type="text" onChange={handleInput} value={input}/>
          <button onClick={sendMessage}>Send Text</button>    

        </div>       : null
      }

<div ref={messagesEndRef}/>


        </ContentWrapper>
        
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

export default connect(mapStateToProps,mapDispatchToProps)(Consultants); 
