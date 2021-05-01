export const user = (data) => {
    return {
        type: "USER",
        payload: data
    }
}

export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}