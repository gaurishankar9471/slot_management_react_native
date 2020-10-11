import { createStore } from "redux";
import slotReducer from "../reducer/slotReducer";

const store = createStore(slotReducer);

export default store;
