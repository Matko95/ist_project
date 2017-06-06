export const data_request = () => {
    return {
        type: "DATA_REQUEST",
        isFetching: true
    }
};

export const data_success = (data, dataType) => {
    return {
        type: "DATA_SUCCESS",
        isFetching: false,
        data,
        dataType
    }
};

export const data_error = (error) => {
    return {
        type: "DATA_ERROR",
        isFetching: false,
        error
    }
};

export const delete_request = () => {
    return {
        type: "DELETE_REQUEST",
        isFetching: true
    }
};

export const delete_success = (data, dataType, arrayType, index) => {
    return {
        type: "DELETE_SUCCESS",
        isFetching: false,
        dataType,
        index,
        arrayType
    }
};

export const delete_error = (error) => {
    return {
        type: "DELETE_ERROR",
        isFetching: false,
        error
    }
};

export const deleteData = (urlPath, id, arrayType, index) => {
    let config = {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: "tabela="+urlPath
    };

    return dispatch => {
        dispatch(delete_request());

        return fetch(`/obrisi/${id}`, config)
            .then(response => response.json()
            .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                dispatch(delete_success(data.data, urlPath, arrayType, index))
            })
            .catch(err => console.log(err));
    }
};

export const getData = (urlPath) => {
    let config = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
            'Content-Type':'application/x-www-form-urlencoded'
        }
    };

    return dispatch => {
        dispatch(data_request());

        return fetch(`/${urlPath}`, config)
            .then(response => response.json()
            .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                if (!response.ok) {
                     return dispatch(data_error(data.message));
                }

                dispatch(data_success(data, urlPath))
            })
            .catch(err => dispatch(data_error(err)));
    }
};