import {
  SET_USER_DOORS,
  SET_DOOR_LISTENER,
  SET_LOADING_USER_DOORS,
  SET_LOADING_DOORS,
} from '../types';

const initialState = {
  doors: [],
  user_doors: [],
  loadingU: true,
  loadingD: true,
};
function findIndexByProperty(data, value) {
  for (let i = 0; i < data.length; i++) {
    console.log('data', value);
    console.log('data', data);
    if (data[i].key === value) {
      return i;
    }
  }
  return -1;
}
export const doorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_USER_DOORS:
      return {
        ...state,
        loadingU: action.payload,
      };
    case SET_LOADING_DOORS:
      return {
        ...state,
        loadingD: action.payload,
      };
    case SET_USER_DOORS:
      return {
        ...state,
        loadingU: false,
        user_doors: action.payload,
      };
    case SET_DOOR_LISTENER:
      console.log('SET_DOOR_LISTENER', state.doors);
      if (state.doors !== []) {
        const newDoorIndex = findIndexByProperty(
          state.doors,
          action.payload.key,
        );
        if (newDoorIndex > -1) {
          return {
            ...state,
            loadingD: false,
            doors: state.doors.map((item) => {
              if (item.key === action.payload.key) {
                item.status = action.payload.status;
                item.isLock = action.payload.isLock;
                item.log = action.payload.log;
                item.pass = action.payload.pass;
              }
              return item;
            }),
          };
        } else {
          return {
            ...state,
            loadingD: false,
            doors: [...state.doors, action.payload],
          };
        }
      } else {
        return {
          ...state,
          loadingD: false,
          doors: [...state.doors, action.payload],
        };
      }

    default:
      return state;
  }
};
