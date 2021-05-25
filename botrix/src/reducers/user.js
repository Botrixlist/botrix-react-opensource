const user = (state = {}, action) => {
  switch (action.type) {
    case "SET":
      return (state = action.payload);
    case "UNSET":
      return (state = {});
    default:
      return state;
  }
};

export default user;
