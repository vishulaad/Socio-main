import * as api from './api.js';


export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.createPost(post);
        history(`/`)
        // console.log(data)
        dispatch({ type: 'CREATE', payload: data });
    }
    catch (error) {
        console.log(error);
    }
};