const reducer = (state, action) => {
  if (action.type === "CLEAR_ITEMS") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let newCard = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return {
      ...state,
      cart: newCard,
    };
  }
  if (action.type === "DECREASE") {
    let newCard = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((itemDecrase) => itemDecrase.amount !== 0);
    return {
      ...state,
      cart: newCard,
    };
  }

  if (action.type === "GET_TOTALS") {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const totalAmount = cartItem.price * cartItem.amount;
        cartTotal.amount += cartItem.amount;
        cartTotal.total += totalAmount;
        return cartTotal;
      },
      {
        amount: 0,
        total: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, amount, total };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, loading: false, cart: action.payload };
  }
  return state;
};

export default reducer;
