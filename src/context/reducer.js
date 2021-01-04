import {
    STORE_TOKEN,
    STORE_USER_DATA    
} from './actionNames';

const initialState = {
    user: '',
    token: '',
    posts: '',
    comments: ''
}

export default function reducer (state=initialState, action) {
    switch(action.type) {
        case STORE_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case STORE_USER_DATA: 
            return {
                ...state,
                user: { ...action.payload }
            }

        default:
            return state;
    }
}
