const notification = (state = [], action) => {
  switch (action.type) {
    case "DISPATCH":
      return (state = [
        ...state,
        {
          data: action.payload.data,
          type: action.payload.type,
          expire: action.payload.expire,
        },
      ]);
    case "REMOVE":
      return (state = []);
    default:
      return state;
  }
};

export default notification;
