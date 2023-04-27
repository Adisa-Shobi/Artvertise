export const initialState = {
    basket: [],
    user: null,
};

// Selector
export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.price + amount, 0);
}

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
                newBasket.splice(index, 1);
            console.log('NEW BASKET >>>', newBasket);

            if (index >= 0) {

            } else {
                console.warn(
                    `Can't remove product (id: ${action.id}) as it is not in basket !`
                )
            }
            return {
                ...state,
                basket: newBasket
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }
        default:
            return state
    };
};

export default reducer;