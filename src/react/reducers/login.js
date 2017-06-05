export const login = (state = {
    isFetching: false,
    jwt: null,
    isAuthenticated: false,
    error: ""
}, action) => {
    switch(action.type){
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isFetching: action.isFetching,
                jwt: action.jwt,
                isAuthenticated: true,
                error: ''
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                isFetching: action.isFetching,
                error: action.error
            };
        default:
            return state;
    }
};