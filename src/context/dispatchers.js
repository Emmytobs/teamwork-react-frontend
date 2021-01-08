import { 
    STORE_TOKEN,
    STORE_USER_DATA,
    STORE_DEPARTMENT_MEMBERS,
    STORE_POST,
    STORE_LATEST_POSTS,
    STORE_PREVIOUS_POSTS
} from './actionNames';

// Used in the LogIn and SignUp component(s)
export const storeToken = (token, dispatch) => {
    // First store token in local storage
    localStorage.setItem('token', JSON.stringify(token));
    // Store token in redux state
    dispatch({ type: STORE_TOKEN, payload: token });
}

// Used in the LogIn and SignUp component(s)
export const storeUser = ({ firstname, lastname, email, department, isadmin, profilePic }, dispatch) => {
    dispatch({ type: STORE_USER_DATA, payload: { firstname, lastname, email, department, isadmin, profilePic } });
}

// Used in the MenuBar component
export const storeDepartmentMembers = (members, dispatch) => {
    dispatch({ type: STORE_DEPARTMENT_MEMBERS, payload: members })
}

// Used in the ChatBox.js component
export const storePost  = (post, dispatch) => {
    dispatch({ type: STORE_POST, payload: post })
}

// Used in the ChatBox.js component
export const storePreviousPosts = (posts, dispatch) => {
    dispatch({ type: STORE_PREVIOUS_POSTS, payload: posts });
}