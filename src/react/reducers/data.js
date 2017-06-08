export const api = (state = {
    isFetching: false,
    data: {
        automobili: [],
        korisnici: [],
        popravke: []
    },
    error: ""
}, action) => {
    switch(action.type){
        case 'DATA_REQUEST':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'DATA_SUCCESS':
            return {
                ...state,
                isFetching: action.isFetching,
                data: {
                    ...state.data,
                    [action.dataType]: action.data
                },
                error: ''
            };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.arrayType]: [
                        ...state.data[action.arrayType].slice(0, action.index),
                        ...state.data[action.arrayType].slice(action.index + 1)
                    ]
                }
            };
        case 'DATA_EDIT':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.dataType]: [
                        ...state.data[action.dataType].slice(0, action.index),
                        action.data,
                        ...state.data[action.dataType].slice(action.index + 1)
                    ]
                }
            };
        case 'DATA_ADD':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.dataType] : [
                        ...state.data[action.dataType],
                        action.data
                    ]
                }
            };
        case 'DATA_ERROR':
            return {
                ...state,
                isFetching: action.isFetching,
                error: action.error
            };
        default:
            return state;
    }
};