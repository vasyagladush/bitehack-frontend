import React,{useState} from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Emoji from '../../components/Emoji/Emoji';
import {Form,Button} from 'react-bootstrap';
import classes from './RegisterPage.module.css';
import axios from 'axios';
import {url} from '../../ApiUrl';

const RegisterPage = props=>{
    const [state,setState] = useState({
      fullname: '',
      email: '',
      password: '',
      gender: '',
      country: '',
      dateBirth:"2000-01-01",
      subjects: [],
      subjectName: '',
      subjectPercent: '',
      subjectLevel: ''
    });
    const inputHandler = event =>{
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    }

    const submitUser = async()=>{
      const response = await axios.post(url+'/auth/signup',{
        ...state
      });
      console.log(response.data);
      if(response.data.token){
        localStorage.setItem("token",response.data.token);
        window.location.href="/";
      }

    }

    const addSubject = ()=>{ 
      const subjects = state.subjects;
      subjects.push({
          name: state.subjectName,
          level: state.subjectLevel, 
          percent: state.subjectPercent
      });
      setState(prevState=>{
        return {
          ...prevState, 
          subjects: subjects
        }
      });
    };    

    const deleteSubject = (index)=> { 
      console.log(index);
      const real_subjects = [];
      const subjects = state.subjects;
      subjects.filter((subject,index2)=>{
        if(index2 != index){
          real_subjects.push(subject);
        }
      }); 
      setState(prevState=> { 
        return {
          ...prevState,
          subjects: real_subjects
        }
      })
    };

    return(
        <>
        <Navigation home history={props.history}/>
        <div style={{margin: 'auto',marginTop: '30px',textAlign: 'center'}}>
          <h1>Register<Emoji symbol="👽"/></h1>
          {/* <h2>and start messaging<Emoji symbol="✉️"/><Emoji symbol="📫"/></h2> */}
        </div>
        <div className={classes.div}>
        <Form style={{marginTop: '25px'}}>
          <Form.Group>
            <Form.Control type="email" placeholder="Enter Email" style={{width: '50%',margin: 'auto'}}  name="email" value={state.email} onChange={inputHandler}/>
          </Form.Group>
          <Form.Group >
            <Form.Control type="text" placeholder="Enter Full Name"  style={{width: '50%',margin: 'auto'}}  name="fullname" value={state.fullname} onChange={inputHandler}/>
          </Form.Group>
            <Form.Control type="text"  placeholder="Enter Gender"  style={{width: '50%',margin: 'auto'}}  name="gender" value={state.gender} onChange={inputHandler}/>
          <Form.Group>
            <Form.Control type="password" placeholder="Enter Password" style={{width: '50%',margin: 'auto'}}  name="password" value={state.password} onChange={inputHandler}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter Country" style={{width: '50%',margin: 'auto'}}  name="country" value={state.country} onChange={inputHandler}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="date" style={{width: '50%',margin: 'auto'}}  name="dateBirth" value={state.dateBirth} onChange={inputHandler}/>
          </Form.Group>
          <h2>Add Subjects:</h2>
          
          <Form.Group>
            <Form.Control placeholder='subject name' type="text" style={{width: '50%',margin: 'auto'}}  name="subjectName" value={state.subjectName} onChange={inputHandler}/> 
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder='subject percent' type="text" style={{width: '50%',margin: 'auto'}}  name="subjectPercent" value={state.subjectPercent} onChange={inputHandler}/>
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder='subject level' type="text" style={{width: '50%',margin: 'auto'}}  name="subjectLevel" value={state.subjectLevel} onChange={inputHandler}/>
          </Form.Group>
          <div>
          <Button style={{marginBottom: '30px'}} onClick={addSubject}>
            Add Subject
          </Button>
          </div>
          <div>
            <h2>Subjects:</h2>
            {state.subjects.map((subject,index)=>{
              return (
                <div  style={{border: '1px solid black'}}>
                  <p style={{cursor:'pointer'}} onClick={()=>deleteSubject(index)}>Delete</p>
                      <h2>{subject.name} {subject.level} {subject.percent}</h2>
                </div>
              )
            })}
          </div>

          <Button variant='dark' style={{marginBottom: '50px '}} onClick={submitUser}>
            Register
         </Button>
        </Form> 
        </div>
        </>
    )
};

export default RegisterPage;