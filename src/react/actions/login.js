export const login_request = () => {
    return {
        type: "LOGIN_REQUEST",
        isFetching: true
    }
};

export const login_success = (jwt) => {
    return {
        type: "LOGIN_SUCCESS",
        isFetching: false,
        jwt
    }
};

export const login_error = (error) => {
    return {
        type: "LOGIN_ERROR",
        isFetching: false,
        error
    }
};

// response : [ {date: 2017-05-23, calls: 10}, {date: 2017-05-24, calls: 15} ]
export const login = (username, password) => {
    let config = {
        method: "POST",
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    };

    return dispatch => {
        dispatch(login_request());

        return fetch(`/login`, config)
            .then(response => response.json()
            .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                if (!response.ok) {
                     return dispatch(login_error(data.message));
                }

                localStorage.setItem("jwt", data.jwt);
                dispatch(login_success())
            })
            .catch(err => dispatch(login_error(err)));
    }
};