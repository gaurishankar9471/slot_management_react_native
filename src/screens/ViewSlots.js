import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, FAB, List, Button } from "react-native-paper";
import Header from "../component/Header";
import { useSelector, useDispatch } from "react-redux";
import { addslot, updateslot } from "../reducer/slotReducer";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
import { add } from "react-native-reanimated";

function ViewSlots({ navigation }) {
  const slots = useSelector(state => state);
  const dispatch = useDispatch();

  const addSlot = slot => {
    console.log(slot);
    dispatch(addslot(slot));
  };

  const updateSlot = (id, data) => {
    dispatch(updateslot(id, data));
    console.log("ViewNote -" + id);
  };

  const getMyColor = isBooked => {
    if (isBooked) {
      return "#EC4849";
    } else {
      return "#2C3335";
    }
  };

  const run_initial = id => {
    storage
      .save({
        key: "user", // Note: Do not use underscore("_") in key!
        id: id, // Note: Do not use underscore("_") in id!
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

  const check = id => {
    console.log("Runned ");
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

        return "kkk";
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        // console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            console.log("Not");
            run_initial(id);
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });
  };

  const checkLoop = id => {
    for (var i = 1; i < 8; i++) {
      console.log("0" + i);
      //   run_initial("0" + i);
      check("0" + i);
    }
  };

  const initLoop = () => {
    for (var i = 1; i < 8; i++) {
      console.log("0" + i);
      //   run_initial("0" + i);
      run_initial("0" + i);
    }
  };

  //Initialize Storage
  const storage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage, // for web: window.localStorage
    defaultExpires: 1000 * 3600 * 24,

    enableCache: true,

    sync: {}
  });

  storage.save({
    key: "user", // Note: Do not use underscore("_") in key!
    id: "01", // Note: Do not use underscore("_") in id!
    data: {
      first_name: "sfd",
      last_name: "",
      mobile: "",
      isBooked: false,
      slotTitle: "6 : 12PM",
      slotDescription: "Book Fast to avoid missing"
    },
    expires: null
  });

  //   storage
  //     .load({
  //       key: "user",
  //       id: "05"
  //     })
  //     .then(ret => {
  //       // found data goes to then()

  //       //   console.log(ret);

  //       return "kkk";
  //     })
  //     .catch(err => {
  //       // any exception including data not found
  //       // goes to catch()
  //       console.warn(err.message);
  //       switch (err.name) {
  //         case "NotFoundError":
  //           // TODO;
  //           break;
  //         case "ExpiredError":
  //           // TODO
  //           break;
  //       }
  //     });

  //Loading Initaial Data from Storage
  const loadInitialData = () => {
    storage.getIdsForKey("user").then(ids => {
      console.log(ids);
      ids.forEach(id => {
        storage
          .load({
            key: "user",
            id: id
          })
          .then(ret => {
            // found data goes to then()
            console.log();
            console.log("My i d new " + ret.first_name);
            addSlot({
              slotTitle: ret.slotTitle,
              slotDescription: ret.slotDescription,
              id: id,
              isBooked: ret.isBooked
            });
          })
          .catch(err => {
            // any exception including data not found
            // goes to catch()
            // console.warn(err.message);
            switch (err.name) {
              case "NotFoundError":
                // TODO;
                console.log(" Not Found Here 2");
                break;
              case "ExpiredError":
                // TODO
                break;
            }
          });
      });
    });
  };
  //   storage.clearMapForKey("user");
  //   initLoop();

  //Redirect to Booing Details Page

  const openBookingDetails = (id, slotTitle) => {
    check(id);
    //load data from storage start
    console.log("ID Check->" + id);
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
        // any exception including data not found
        // goes to catch()
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
            <Text style={styles.title}>You do not have any Notes</Text>
          </View>
        ) : (
          <FlatList
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
                descriptionStyle={styles.listTitle}
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
          onPress={() => checkLoop("1")}
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
  }
});

export default ViewSlots;
