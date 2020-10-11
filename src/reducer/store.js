import { createStore } from "redux";
import slotReducer from "./slotReducer";

const store = createStore(slotReducer);

export default store;
