import {
  LOAD_USER_DOORS,
  DOOR_LISTENER,
  LOADING_USER_DOORS,
  LOADING_DOORS,
  LOAD_DOORS,
  ADD_DOOR,
} from '../types';
import {findIndexByProperty} from '../../constants';

const initialState = {
  doors: [],
  allDoors: [],
  user_doors: [],
  error: null,
  loadingUserDoors: true,
  loadingDoor: [],
  loadingAllDoors: true,
};
const handlers = {
  [LOAD_DOORS]: (state, {doors}) => ({
    ...state,
    allDoors: doors,
    loadingAllDoors: false,
  }),
  [ADD_DOOR]: (state, {error}) => ({...state, loadingDoor: false, error}),
  [DOOR_LISTENER]: (state, {door}) => {
    if (state.doors !== []) {
      const newDoorIndex = findIndexByProperty(state.doors, door.key);
      if (newDoorIndex > -1) {
        return {
          ...state,
          loadingDoor: false,
          doors: state.doors.map((item) => {
            if (item.key === door.key) {
              item.status = door.status;
              item.isLock = door.isLock;
              item.log = door.log;
              item.pass = door.pass;
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          loadingDoor: false,
          doors: [...state.doors, door],
        };
      }
    } else {
      return {
        ...state,
        loadingDoor: false,
        doors: [...state.doors, door],
      };
    }
  },
  [LOAD_USER_DOORS]: (state, {doors}) => ({
    ...state,
    loadingUserDoors: false,
    user_doors: doors,
  }),
  [LOADING_DOORS]: (state, {isLoading}) => ({
    ...state,
    loadingDoor: isLoading,
  }),
  [LOADING_USER_DOORS]: (state, {isLoading}) => ({
    ...state,
    loadingUserDoors: isLoading,
  }),
  DEFAULT: (state) => state,
};

export const doorsReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
