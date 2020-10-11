import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, FAB, List, Button } from "react-native-paper";
import Header from "../component/Header";
import { useSelector, useDispatch } from "react-redux";
import { updateslot } from "../reducer/slotReducer";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
import { add } from "react-native-reanimated";

function ViewSlots({ navigation }) {
  const slots = useSelector(state => state);
  const dispatch = useDispatch();

  //disptach update to reducer
  const updateSlot = (id, data) => {
    dispatch(updateslot(id, data));
    console.log("ViewNote -" + id);
  };

  //Function to change backgorund colot flat list item
  const getMyColor = isBooked => {
    if (isBooked) {
      return "#EC4849";
    } else {
      return "#2C3335";
    }
  };

  //set initial value to storage
  const run_initial = id => {
    storage
      .save({
        key: "user",
        id: id,
        data: {
          first_name: "",
          last_name: "",
          mobile: "",
          isBooked: false,
          slotTitle: "6 : 12PM",
          slotDescription: "Book Fast to avoid missing"
        },
        expires: null
      })
      .then(() => {
        console.log("Saveed!");
      })
      .catch(err => console.log(err));
  };
  //check book list for availability
  const check = id => {
    storage
      .load({
        key: "user",
        id: id
      })
      .then(ret => {
        // found data goes to then()
        if (ret.isBooked) {
          updateSlot(id, ret.slotTitle);
        }

        return "";
      })
      .catch(err => {
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            console.log("Not Found");
            run_initial(id);
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });
  };

  const checkAvailablity = () => {
    for (var i = 1; i < 9; i++) {
      check("0" + i);
    }
  };

  //Initialize Storage
  const storage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage,
    defaultExpires: null,

    enableCache: true,

    sync: {}
  });

  // storage.clearMapForKey("user");

  //onClick FlatList Item Function
  const openBookingDetails = (id, slotTitle) => {
    check(id);
    //load data from storage
    storage
      .load({
        key: "user",
        id: id
      })
      .then(ret => {
        // found data goes to then()
        navigation.navigate("UpdateSlot", {
          updateSlot,
          slotId: id,
          slotTitle: slotTitle,
          firstName: ret.first_name,
          lastName: ret.last_name,
          mobile: ret.mobile
        });
      })
      .catch(err => {
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            console.log("Booking Not Found");
            navigation.navigate("UpdateSlot", {
              slotTitle: slotTitle,
              updateSlot,
              slotId: id,
              firstName: "",
              lastName: "",
              mobile: ""
            });
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });

    //end
  };

  return (
    <>
      <Header titleText="Slot Booking App" />
      <View style={styles.container}>
        {slots.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>No Booking Available</Text>
          </View>
        ) : (
          <FlatList
            style={{ marginBottom: 75 }}
            data={slots}
            renderItem={({ item }) => (
              <List.Item
                style={{
                  marginTop: "auto",
                  margin: 10,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 10,
                  backgroundColor: getMyColor(item.slot.isBooked)
                }}
                title={item.slot.slotTitle}
                description={item.slot.slotDescription}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
                titleStyle={styles.listTitle}
                onPress={() => openBookingDetails(item.id, item.slot.slotTitle)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}

        <FAB
          style={styles.fab}
          small
          label="Check Availabilty"
          onPress={() => checkAvailablity()}
        />
        <FAB
          style={styles.fab2}
          small
          label="gallery"
          onPress={() => navigation.navigate("GalleryView", {})}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    backgroundColor: "#219653",
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 10
  },
  fab2: {
    backgroundColor: "#219653",
    position: "absolute",
    margin: 20,
    left: 0,
    bottom: 10
  },
  listTitle: {
    fontSize: 20,
    color: "#fff"
  },
  listDescription: {
    fontSize: 15,
    color: "#fff"
  }
});

export default ViewSlots;
