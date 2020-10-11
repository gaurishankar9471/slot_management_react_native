import remove from "lodash.remove";
import { ADD_SLOT, UPDATE_SLOT } from "../actions/types";
import { cos, add } from "react-native-reanimated";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
import { initialData } from "../rawData";

//initialize storage
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: null,
  enableCache: true,
  sync: {}
});

//actions

export function addslot(slot) {
  console.log("ID From reduce->" + slot.id);
  return {
    type: ADD_SLOT,
    id: slot.id,
    slot
  };
}

export function updateslot(id, data) {
  return {
    type: UPDATE_SLOT,
    payload: id,
    data: data
  };
}

//reducer

function slotReducer(state = initialData, action) {
  switch (action.type) {
    case ADD_SLOT:
      return [
        ...state,
        {
          id: action.id,
          slot: action.slot
        }
      ];
    case UPDATE_SLOT:
      return state.map((item, index) => {
        if (item.id == action.payload) {
          return {
            ...item,
            slot: {
              isBooked: true,
              slotTitle: action.data
            }
          };
        }
        return item;
      });
    default:
      return state;
  }
}

export default slotReducer;
