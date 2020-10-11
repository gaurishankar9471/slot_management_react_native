import remove from "lodash.remove";

export const ADD_SLOT = "ADD_SLOT";
export const UPDATE_SLOT = "UPDATE_SLOT";
import { cos, add } from "react-native-reanimated";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

//initialize store
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
});

//actions

//Action
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

const initialData = [
  {
    id: "01",
    slot: {
      slotTitle: "09:00AM  to 10:00 AM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "02",
    slot: {
      slotTitle: "10:00AM  to 11:00 AM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "03",
    slot: {
      slotTitle: "11:00AM  to 12:00 PM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "04",
    slot: {
      slotTitle: "12 AM  to 01:00 PM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "05",
    slot: {
      slotTitle: "01:00 PM  to 02:00 PM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "06",
    slot: {
      slotTitle: "02:00 PM  to 03:00 PM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "07",
    slot: {
      slotTitle: "03:00 PM  to 04:00 PM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  },
  {
    id: "08",
    slot: {
      slotTitle: "04:00 PM  to 05:00 PM",
      slotDescription: "Book Slot to meet me.",
      isBooked: false,
      first_name: "",
      last_name: "",
      mobile: ""
    }
  }
];

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
        // Find the item with the matching id
        if (item.id == action.payload) {
          //Update Database

          console.log(item.id + " Hare 5");
          // Return a new object
          console.log("Reducer Item" + action.data);
          return {
            ...item, // copy the existing item
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
