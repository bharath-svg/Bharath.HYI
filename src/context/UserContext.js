import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
  usersPerPage: 10,
};

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_TOTAL_COUNT: 'SET_TOTAL_COUNT',
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {...state, loading: action.payload};

    case actionTypes.SET_ERROR:
      return {...state, error: action.payload, loading: false};

    case actionTypes.SET_USERS:
      return {...state, users: action.payload, loading: false, error: null};

    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        totalCount: state.totalCount + 1,
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user,
        ),
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        totalCount: state.totalCount - 1,
      };

    case actionTypes.SET_CURRENT_PAGE:
      return {...state, currentPage: action.payload};

    case actionTypes.SET_TOTAL_COUNT:
      return {...state, totalCount: action.payload};

    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    setLoading: loading =>
      dispatch({type: actionTypes.SET_LOADING, payload: loading}),

    setError: error => dispatch({type: actionTypes.SET_ERROR, payload: error}),

    setUsers: users => dispatch({type: actionTypes.SET_USERS, payload: users}),

    addUser: user => dispatch({type: actionTypes.ADD_USER, payload: user}),

    updateUser: user =>
      dispatch({type: actionTypes.UPDATE_USER, payload: user}),

    deleteUser: userId =>
      dispatch({type: actionTypes.DELETE_USER, payload: userId}),

    setCurrentPage: page =>
      dispatch({type: actionTypes.SET_CURRENT_PAGE, payload: page}),

    setTotalCount: count =>
      dispatch({type: actionTypes.SET_TOTAL_COUNT, payload: count}),
  };

  return (
    <UserContext.Provider value={{state, actions}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
