import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, TextInput, FAB } from "react-native-paper";
import Header from "../component/Header";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

function UpdateSlot({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const slotId = navigation.getParam("slotId", "");
  const slotTitle = navigation.getParam("slotTitle", "");

  const firt_name = navigation.getParam("firstName", "");
  const last_name = navigation.getParam("lastName", "");
  const mobile_no = navigation.getParam("mobile", "");

  //Initialize Storage
  const storage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,

    enableCache: true,

    sync: {}
  });

  function onUpdateNote() {
    storage
      .save({
        key: "user",
        id: slotId,
        data: {
          first_name: firstName,
          last_name: lastName,
          mobile: mobile,
          isBooked: true,
          slotTitle: slotTitle,
          slotDescription: "Book Fast to avoid missing"
        },
        expires: null
      })
      .then(() => {
        console.log("Data Saved Succes fully");
      })
      .catch(err => console.log(err));

    navigation.state.params.updateSlot(slotId, slotTitle);
    navigation.goBack();
  }

  return (
    <>
      <Header titleText="Book Slot" />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />

      <View style={styles.container}>
        <Text style={styles.info}>{firt_name}</Text>
        <Text style={styles.info}>{last_name}</Text>
        <Text style={styles.info}>{mobile_no}</Text>

        <TextInput
          label="Enter First Name"
          value={firstName}
          mode="outlined"
          onChangeText={setFirstName}
          style={styles.title}
        />
        <TextInput
          label="Enter Last Name"
          value={lastName}
          mode="outlined"
          onChangeText={setLastName}
          style={styles.title}
        />
        <TextInput
          label="Enter Mobile No."
          value={mobile}
          mode="outlined"
          onChangeText={setMobile}
          style={styles.title}
        />

        {/* <FAB
          style={styles.fab}
          small
          icon="check"
          disabled={noteTitle == "" ? true : false}
          onPress={() => onSaveNote()}
        /> */}

        <FAB
          style={styles.fabCancel}
          small
          icon="cancel"
          label="Cancel"
          onPress={() => navigation.goBack()}
        />

        <FAB
          style={styles.fabSave}
          small
          icon="plus"
          label="submit"
          onPress={() => onUpdateNote()}
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
  iconButton: {
    backgroundColor: "#219653",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  info: {
    fontSize: 20,
    textAlign: "center",
    padding: 3
  },
  title: {
    fontSize: 20,
    marginBottom: 16
  },
  text: {
    height: 300,
    fontSize: 16
  },
  fabSave: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#219653"
  },
  fabCancel: {
    position: "absolute",
    margin: 20,
    left: 0,
    bottom: 0,
    backgroundColor: "#219653"
  }
});

export default UpdateSlot;
