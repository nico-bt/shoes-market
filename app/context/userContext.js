"use client"
import { useReducer, useContext, useEffect, createContext } from "react"

// Reducer
// ***********************************************************
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIRST_LOAD":
      return {
        ...state,
        isFirstLoad: false,
      }

    case "REGISTER_USER_BEGIN":
      return {
        ...state,
        isLoading: true,
      }
    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        isFirstLoad: action.payload.isFirstLoad,
      }

    case "REDEEM_ITEM_BEGIN":
      return {
        ...state,
        isLoading: true,
      }

    case "REDEEM_ITEM_CANCEL":
      return {
        ...state,
        isLoading: false,
      }

    case "REDEEM_ITEM_SUCCESS":
      if (state.user.money - action.payload.product.price < 0) {
        // Sin suficiente dinero en cuenta
        break
      }
      const newState = {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          money: state.user.money - action.payload.product.price,
          cart: [...state.user.cart, action.payload.product],
        },
      }
      localStorage.setItem("user", JSON.stringify(newState.user))
      return newState

    default:
      break
  }
}

// Initial State
// ***********************************************************
// LOCAL VERSION:
const INITIAL_USER = {
  money: 6000,
  cart: [],
}

const initialState = {
  user: INITIAL_USER,
  isFirstLoad: false,
}

// Context
// ***********************************************************
const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // GET User data
  //-------------------------------------------------------------------------
  const getUser = () => {
    const userInLocal = localStorage.getItem("user")

    if (userInLocal) {
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: { user: JSON.parse(userInLocal), isFirstLoad: false },
      })
    } else {
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: { user: INITIAL_USER, isFirstLoad: true },
      })
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // REDEEM ITEM
  //-------------------------------------------------------------------------
  const redeemItem = (product) => {
    dispatch({ type: "REDEEM_ITEM_BEGIN" })

    dispatch({ type: "REDEEM_ITEM_SUCCESS", payload: { product } })
  }

  const redeemItemCancel = () => {
    dispatch({ type: "REDEEM_ITEM_CANCEL" })
  }

  // Set First Load
  //-------------------------------------------------------------------------
  const setFirstLoadFalse = () => {
    dispatch({ type: "SET_FIRST_LOAD" })
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        redeemItemCancel,
        redeemItem,
        setFirstLoadFalse,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Hook to use the context
const useUserContext = () => {
  return useContext(UserContext)
}

export { UserProvider, useUserContext }
