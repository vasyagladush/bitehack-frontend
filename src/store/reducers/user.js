import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    consultant: {} ,
    messages: [],
    user: {},
    amIConsultant: false
};

const setPerson = (state,action) =>{
    return {
        ...state,
        user: action.user
    }
}

const setMessages = (state,action)=>{
    return {
        ...state,
        messages: action.messages
    }
}

const addMessage = (state,action)=>{
    return {
        ...state,
        messages: [...state.messages,action.message]
    }
}

const addMe = (state,action)=>{ 
    return {
        ...state,
        meId: action.id
    }
}

const setAmIConsultant =(state,action)=>{ 
    return {
        ...state,
        amIConsultant: true
    }
}

const setConsultant = (state,action)=>{ 
    return {
        ...state,
        consultant: action.consultant
    }
}

const reducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case actionTypes.SET_USER: {
            return setPerson(state,action);
        }
        case actionTypes.SET_MESSAGES: {
            return setMessages(state,action);
        }
        case actionTypes.ADD_MESSAGE: {
            return addMessage(state,action);
        }
        case actionTypes.ADD_ME: {
            return addMe(state,action);
        }
        case actionTypes.SET_AM_I_CONSULTANT: {
            return setAmIConsultant(state,action);
        }
        case actionTypes.SET_CONSULTANT: { 
            return setConsultant(state,action);
        }
        default: {
            return state;
        }
    }
}

export default reducer;