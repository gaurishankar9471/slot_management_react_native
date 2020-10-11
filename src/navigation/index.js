import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ViewNotes from "../screens/ViewNotes";

import ViewSlots from "../screens/ViewSlots";
import UpdateSlot from "../screens/UpdateSlot";

import AddNotes from "../screens/AddNotes";
import SlotDetails from "../screens/SlotDetails";

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    },
    UpdateSlot: {
      screen: UpdateSlot
    },
    SlotDetails: {
      screen: SlotDetails
    },
    ViewSlots: {
      screen: ViewSlots
    }
  },
  {
    initialRouteName: "ViewSlots",
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(StackNavigator);
