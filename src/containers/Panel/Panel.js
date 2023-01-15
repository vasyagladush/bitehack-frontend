import React,{useEffect,useState} from 'react';
import Navigation from '../../components/Navigation/Navigation';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import classes from './Panel.module.css';
import * as actions from '../../store/actions/index';


const Panel = props=>{
    const [state,setState] = useState({
        name: '',
        surname: ''
    }); 
    useEffect(()=>{
        // axios.get(url+'/user/me',{
        //     headers:{
        //         'Authorization': 'Bearer '+localStorage.getItem('token')
        //     }
        // })
        // .then(response=>{
        //     props.setMe(response.data.id);
        //     setState({
        //         name: response.data.name,
        //         surname: response.data.surname
        //     })
        // })
    },[props])
    return (
        <>
            <div className={classes.container}>
                <Button variant="dark" className={classes.Button} onClick={()=>{
                    localStorage.removeItem('token');
                    window.location.reload(false);
                }}>logout</Button>
            </div>  
            <Navigation home history={props.history}/>
                {
                    // info
                }
        </>
    )
};

const mapStateToProps = state =>{
    return {
        messages: state.messages,
        personId: state.personId,
        meId: state.meId
    }
};

const mapDispatchToProps = dispatch=>{
    return {
        setMe: (id)=>dispatch(actions.addMe(id))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Panel);