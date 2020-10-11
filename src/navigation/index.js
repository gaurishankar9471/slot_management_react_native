import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ViewSlots from "../screens/ViewSlots";
import UpdateSlot from "../screens/UpdateSlot";

import GalleryView from "../screens/GalleryView";

const StackNavigator = createStackNavigator(
  {
    ViewSlots: {
      screen: ViewSlots
    },
    UpdateSlot: {
      screen: UpdateSlot
    },
    GalleryView: {
      screen: GalleryView
    }
  },
  {
    initialRouteName: "ViewSlots",
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(StackNavigator);
