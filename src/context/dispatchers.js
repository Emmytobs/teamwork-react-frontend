import { 
    STORE_TOKEN,
    STORE_USER_DATA,
    STORE_DEPARTMENT_MEMBERS
} from './actionNames';

export const storeToken = (token, dispatch) => {
    // First store token in local storage
    localStorage.setItem('token', JSON.stringify(token));
    // Store token in redux state
    dispatch({ type: STORE_TOKEN, payload: token });
}

export const storeUser = ({ firstname, lastname, email, department }, dispatch) => {
    dispatch({ type: STORE_USER_DATA, payload: { firstname, lastname, email, department }});
}

// Used in the MenuBar component
export const storeDepartmentMembers = (members, dispatch) => {
    dispatch({ type: STORE_DEPARTMENT_MEMBERS, payload: members })
}
