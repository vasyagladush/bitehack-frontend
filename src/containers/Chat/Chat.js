import React, { useEffect,useState } from "react";
import NavigationBar from "../../components/Navigation/Navigation";
import Messenger from "../Messenger/Messenger";
import axios from "axios";
import {url} from "../../ApiUrl.js";
import openSocket from 'socket.io-client';

const socket = openSocket(url);
const Chat = props=>{
    const [state,setState] = useState({
        consultants: [],
        openChat: false,
        chosenConsultant: null,
        chat: null,
        messages: [],
        me: null,
    });
    const [input,setInput] = useState('');

    useEffect(async()=>{ 
        socket.emit("connect");
        socket.on("message",(data)=> { 
            console.log(data);
            console.log(state); // global state and redux
           if(!data.userSender && data.user._id == state.me._id){ // and message for this exact user
            console.log(data);
            // const messages = state.messages;
            // messages.push({

            // })
            // messages.push()
           }
           
            // console.log(data);
        });
        const response = await axios.get(url+"/consultant",{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        });

        const response2 = await axios.get(url+'/chat/test/me',{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        });

        console.log(response2.data);

        setState(prevState=> { 
            return {
                ...prevState,
                consultants: response.data,
                me: response2.data
            }
        });
    },[]);
    

    const sendMessage = async()=>{
        const response = await axios.post(url+'/chat/message',{
            personId: state.chosenConsultant,
            message: input
        },{
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        });

        const messages = state.messages;
        messages.push({
            sender: response.data.userSender ? response.data.user._id : response.data.consultant._id,
            message: response.data.message 
        });
        
        setState(prevState=>{
            return {
                ...prevState,
                messages: messages
            }
        });
    };


    const handleInput = (event)=>{
        setInput(event.target.value);
    };

    const onClickConsultant =async (consultant) =>{
        const chat = await axios.get(url+"/chat/"+consultant._id.toString(),{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        });
        if(!chat.data){
            setState(prevState =>{
                return {
                    ...prevState,
                    chosenConsultant: consultant._id,
                    openChat: true,
                    messages: [],
                }
            });
        }
        else {
            setState(prevState=> {
                return {
                    ...prevState,
                    chosenConsultant: consultant._id,
                    openChat: true,
                    messages: chat.data.messages,
                } 
            });
        }
    };
    
    return (
        <>
        <NavigationBar chat history={props.history}/>
        <div style={{width: '50%'}}>
            {state.consultants.map(consultant=>{
                return (
                    <div key={consultant._id} onClick={()=>onClickConsultant(consultant)} style={{border: '1px solid black',cursor: 'pointer',width: '500px',height: '400px'}}>
                        <img width="200x" height="200px" style={{borderRadius: '100px'}} src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"/>
                        <h1>{consultant.fullname}</h1>
                        {consultant.universities.map(university=>{
                            return (<ul key={university._id}>
                                <li>{university.name}</li>
                                <li>{university.location}</li>
                            </ul>)
                        })}
                         

                    </div>
                )
            })}

{state.openChat ? 
<>
<div style={{border: '1px solid black',marginTop: '50px',height: '500px',width: '500px', overflowY: 'auto'}}>
    {
        state.messages.map(message=> {
            return (
                <p>{message.sender}: {message.message}</p>
            )
        })
    }
</div> 

<input onChange={handleInput} value={input}/>
<button onClick={sendMessage}>Send Text</button>
</> : null
} 
        </div>
        </>
    ); 
};

            export default Chat;