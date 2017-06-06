import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { login } from './login';
import { api } from './data';

const appReducer = combineReducers({
    login,
    api,
    routing: routerReducer
});

/*   Clears the store state    */
const rootReducer = (state, action) => {
    if(action.type === 'CLEAR_STORE') {
        const { routing } = state;
        state = { routing }
    }

    return appReducer(state, action);
};

export default rootReducer;