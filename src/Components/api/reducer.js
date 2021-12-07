export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
  //add this log to debug this will show you
  //what is happening
  //what action is happening
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_TO_BASKET":
      //add item to basket
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
      break;
    case "REMOVE_FROM_BASKET":
      //remove from basket

      return {
        ...state,
        basket: state.basket.filter(
          (basketitem) => basketitem.id !== action.payload
        ),
      };
      break;
    default:
      return state;
  }
};

export default reducer;
