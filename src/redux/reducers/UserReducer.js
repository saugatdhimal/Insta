
const initialState = {
    data: []
}

const UserReducer = (state = initialState, action) => {
    switch (action.type){
        case "USER":
            return {
                ...state,
                data: [...state.data,action.payload]
            }
        case "REMOVE_USER":
            return {
                ...state,
                data: []
            }
        default:
            return state
    }
}

export default UserReducer