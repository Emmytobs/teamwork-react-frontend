import {
    STORE_TOKEN,
    STORE_USER_DATA,
    STORE_DEPARTMENT_MEMBERS,
    STORE_POST,
    STORE_LATEST_POSTS,
    STORE_PREVIOUS_POSTS
} from './actionNames';

const initialState = {
    user: {
        firstname: '',
        lastname: '',
        email: '',
        department: '',
        isadmin: '',
        profilePic: '',
    },
    token: '',
    posts: [],
    comments: [],
    departmentMembers: []
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

        case STORE_DEPARTMENT_MEMBERS:
            return {
                ...state,
                departmentMembers: [ ...action.payload ]
            }

        case STORE_POST: 
            return {
                ...state,
                posts: [ ...state.posts, action.payload ]
            }

        case STORE_LATEST_POSTS: 
            return {
                ...state,
                posts: [ ...action.payload ]
            }

        case STORE_PREVIOUS_POSTS:
            return {
                ...state,
                posts: [ ...action.payload, ...state.posts ]
            }

        default:
            return state;
    }
}