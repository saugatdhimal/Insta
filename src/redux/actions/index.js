import { getUserById } from "../../firebase/service"

export const user = (userId) => async dispatch => {
    try {
        dispatch({
            type: "USER_LOADING"
        })
        const res = await getUserById(userId)
        dispatch({
            type: "USER_SUCCESS",
            payload: res
        })
    } catch (error) {
        dispatch({
            type: "USER_FAIL"
        })
    }
}

export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}