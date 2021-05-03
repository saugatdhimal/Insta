const initialState = {
  loading: false,
  data: null,
  errorMsg: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "USER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "USER_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "NO USER",
      };
    case "REMOVE_USER":
      return {};
    default:
      return state;
  }
};

export default UserReducer;
