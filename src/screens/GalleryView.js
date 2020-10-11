import React, { Component } from "react";
import { View, Text, Overlay, OtherOverlay } from "react-native";
import GallerySwiper from "react-native-gallery-swiper";

export default class GallerView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GallerySwiper
        images={[
          {
            source: require("../img/01.jpg"),
            width: 1080,
            height: 1920
          },
          {
            source: require("../img/02.png"),

            width: 1080,
            height: 1920
          },
          {
            source: require("../img/03.png"),

            width: 1080,
            height: 1920
          },
          {
            source: require("../img/04.jpg"),

            width: 1080,
            height: 1920
          },
          {
            source: require("../img/05.jpg"),

            width: 1080,
            height: 1920
          }
        ]}
      />
    );
  }
}
