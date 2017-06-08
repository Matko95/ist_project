export const edit_success = (dataType, data, index) => {
    return {
        type: 'DATA_EDIT',
        dataType,
        data,
        index
    }
};

export const add_success = (dataType, data) => {
    return {
        type: 'DATA_ADD',
        dataType,
        data
    }
};

export const editData = (dataType, editData, index) => {
    let config = {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(editData)
    };

    return dispatch => {
        return fetch(`/edit${dataType}`, config)
            .then(response => response.json()
            .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                dispatch(edit_success(dataType, editData, index))
            })
            .catch(err => console.log(err));
    }
};

export const addData = (dataType, addData) => {
    let config = {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(addData)
    };

    return dispatch => {
        return fetch(`/add${dataType}`, config)
            .then(response => response.json()
                .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                dispatch(add_success(dataType, addData))
            })
            .catch(err => console.log(err));
    }
};

