import * as actionTypes from '../actions/actionTypes';

export const setUser = (user) =>{
    return {
        type: actionTypes.SET_USER,
        user: user
    }
}

export const setConsultant = (consultant)=>{ 
    return {
        type: actionTypes.SET_CONSULTANT,
        consultant: consultant
    }
}

export const setAmIConsultant = () =>{ 
    return {
        type: actionTypes.SET_AM_I_CONSULTANT, 
        amIConsultant: true
    }
}

export const setMessages = (messages) =>{
    return {
        type: actionTypes.SET_MESSAGES,
        messages: messages
    }
}

export const addMessage = (data) => {
    return {
        type: actionTypes.ADD_MESSAGE,
        message: data
    }
}

export const addMe = (id) =>{
    return {
        type: actionTypes.ADD_ME,
        id: id
    }
}