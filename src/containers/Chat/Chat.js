import React, { useEffect,useState } from "react";
import NavigationBar from "../../components/Navigation/Navigation";
import Messenger from "../Messenger/Messenger";
import axios from "axios";
import {url} from "../../ApiUrl.js";

const Chat = props=>{
    const [state,setState] = useState({
        consultants: []
    });

    useEffect(async()=>{ 
        const {data} = await axios.get(url+"/consultant",{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        });

        setState(prevState=> { 
            return {
                ...prevState,
                consultants: data
            }
        });
    },[]);
    
    const onClickConsultant = () =>{

    };
    
    return (
        <>
        <NavigationBar chat history={props.history}/>
        <div style={{width: '50%'}}>
            <h3>Have a question? </h3>
            <h3>Reach out our Consultant!</h3>
            {state.consultants.map(consultant=>{
                return (
                    <div key={consultant._id} style={{border: '1px solid black',cursor: 'pointer'}}>
                        <img width="200x" height="200px" style={{borderRadius: '100px'}} src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg"/>
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
            {/* <Messenger/> */}

        </div>
        </>
    ); 
};

            export default Chat;