import React, { createContext, useContext, useReducer, useEffect } from "react";

const CreateCart = createContext();

// Initial state from localStorage
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: (item.quantity + 1) * item.price,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          },
        ],
      };
    }

    case "INCREMENT": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        ),
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0), // remove if 0
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    }

    default:
      return state;
  }
}

export function CartContext({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Actions
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const increment = (id) => {
    dispatch({ type: "INCREMENT", payload: id });
  };

  const decrement = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <CreateCart.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        increment,
        decrement,
        removeFromCart,
      }}
    >
      {children}
    </CreateCart.Provider>
  );
}

// Custom hook
export const useCart = () => {
  const context = useContext(CreateCart);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};