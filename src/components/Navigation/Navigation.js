import React,{useState} from 'react';
import classes from './Navigation.module.css';
import Backdrop from '../Backdrop/Backdrop';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const NavigationBar = props=>{
    const [show,setShow] = useState(false);

    const changeRoute = url =>{
        props.history.push(url);
    };

    const handleSidebar = ()=>{
        setShow(prevstate=>!prevstate);
    }

    return (
        <>
        <div className={classes.navDesktop}>

            {props.chat ? <p className={classes.active}>Chat</p> : <p
            onClick={()=>changeRoute('/chat')}>
                    Chat
                </p>}
            {props.home ? <p className={classes.active}>Home</p> : 
            <p onClick={()=> changeRoute('/')}>
                Home
            </p> }
            <p>``
                Calculator
            </p>
            {props.about ? <p className={classes.active}>About</p> :
            <p onClick={()=> changeRoute('/about')}>
                About
            </p>
            }
        </div>
        <DrawerToggle clicked={handleSidebar}/>
            <ul className={show ? [classes.open,classes.mobile].join(' ') : [classes.close,classes.mobile].join(' ')}>
                <li>
                    <img src={require('../../images/messenger.png')} alt="messenger logo" width='50%' height='50%' style={{marginLeft: 10,marginBottom: 10}}/>
                </li>

                <li>
                {props.home ? <p className={classes.active}>Home</p> : 
                <p onClick={()=> changeRoute('/')}>
                    Home
                </p> } 
                </li>
                <li>
                {props.about ? <p className={classes.active}>About</p> :
                <p onClick={()=> changeRoute('/about')}>
                    About
                </p>
                }
                </li>
            </ul>
        <Backdrop show={show} clicked={handleSidebar}/>
        </>
    )
}; 

export default NavigationBar;