import {
    STORE_TOKEN,
    STORE_USER_DATA,
    STORE_DEPARTMENT_MEMBERS,
    STORE_POST,
    STORE_PREVIOUS_POSTS,
    STORE_UPDATED_POST
} from './actionNames';

const initialState = {
    user: {
        userId: '',
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

        case STORE_PREVIOUS_POSTS:
            return {
                ...state,
                posts: [ ...action.payload, ...state.posts ]
            }
            
        case STORE_UPDATED_POST:
            return storePostUpdate(state, action.payload)

        default:
            return state;
    }
}

function storePostUpdate (state, updatedPost) {
    const { post_id: postId } = updatedPost;
    const updatedPosts = state.posts.map(post => {
        if (post.post_id === postId) {
            return {
                ...post,
                article: updatedPost.article
            }
        }
        return post
    });
    return {
        ...state,
        posts: [ ...updatedPosts ]
    }
}