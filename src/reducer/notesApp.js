import remove from "lodash.remove";

export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATE_SLOT = "UPDATE_SLOT";
import { cos, add } from "react-native-reanimated";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
//fetch Node
const storage = new Storage({
  size: 1000,

  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: 1000 * 3600 * 24,

  enableCache: true,

  sync: {}
});

// load

//

let noteID = 100;
const initialData = [
  {
    id: "1",
    note: {
      // id="3232",
      noteTitle: "9AM : 10 PM",
      noteDescription: "Book Slot to meet me.",
      isBooked: true
    }
  },
  {
    id: "2",
    note: {
      // id:"22",
      noteTitle: "9AM : 10 PM",
      noteDescription: "Book Slot to meet me.",
      isBooked: checkMyFuct
    }
  }
];

const checkMyFuct = () => {};

//Action
export function addnote(note) {
  console.log("ID From reduce->" + note.id);
  return {
    type: ADD_NOTE,
    id: note.id,
    note
  };
}

export function deletenote(id) {
  return {
    type: DELETE_NOTE,
    payload: id
  };
}
export function updateslot(id) {
  return {
    type: UPDATE_SLOT,
    payload: id
  };
}

// Reducers

function notesReducer(state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note
        }
      ];

    case DELETE_NOTE:
      const deleteNewArray = remove(state, obj => {
        return obj.id != action.payload;
      });

      return deleteNewArray;
    case UPDATE_SLOT:
      return state.map((item, index) => {
        // Find the item with the matching id
        if (item.id == action.payload) {
          //Update Database

          storage.save({
            key: "user", // Note: Do not use underscore("_") in key!
            id: item.id,
            data: {
              first_name: "Gauri Shankar",
              last_name: "Gupta",
              mobile: "1234",
              isBooked: true
            },

            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: null
          });
          // Return a new object
          return {
            ...item, // copy the existing item
            note: {
              isBooked: true,
              noteTitle: "Booked"
            } // replace the email addr
          };
        }

        // Leave every other item unchanged
        return item;
      });
    default:
      return state;
  }
}

export default notesReducer;
