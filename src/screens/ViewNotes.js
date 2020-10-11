import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, FAB, List, Button } from "react-native-paper";
import Header from "../component/Header";
import { useSelector, useDispatch } from "react-redux";
import { addnote, deletenote, updateslot } from "../reducer/notesApp";
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";
import { add } from "react-native-reanimated";
function ViewNotes({ navigation }) {
  // const [notes, setNotes] = useState([])
  const notes = useSelector(state => state);
  const dispatch = useDispatch();

  const addNote = note => {
    console.log(note);
    dispatch(addnote(note));
  };

  const deleteNote = id => dispatch(deletenote(id));
  const updateSlot = id => {
    dispatch(updateslot(id));
    console.log("ViewNote -" + id);
  };

  const getMyColor = isBooked => {
    // console.log(isBooked);
    if (isBooked) {
      return "#EC4849";
    } else {
      return "#2C3335";
    }
  };

  //fetch Node
  const storage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage, // for web: window.localStorage
    defaultExpires: 1000 * 3600 * 24,

    enableCache: true,

    sync: {}
  });

  const loadInitialata = () => {
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
            addNote({
              noteTitle: ret.timeSlotTitle,
              noteDescription: ret.timeSlotDescription,
              id: id,
              isBooked: ret.isBooked
            });
          })
          .catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
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
  storage.save({
    key: "user", // Note: Do not use underscore("_") in key!
    id: "03", // Note: Do not use underscore("_") in id!
    data: {
      first_name: "kkkk; ",
      last_name: "Sahi",
      mobile: "798045",
      isBooked: false,
      timeSlotTitle: "14AM : 12PM",
      timeSlotDescription: "Book Fast to avoid missing"
    },
    expires: null
  });

  const loadData = id => {
    //load data from storage start

    console.log("her ->" + id);

    storage
      .load({
        key: "user",
        id: id
      })
      .then(ret => {
        // found data goes to then()
        console.log(ret);
        navigation.navigate("AddNotes", {
          updateSlot,
          slotId: id,
          firstName: ret.first_name,
          lastName: ret.last_name,
          mobile: ret.mobile
        });
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
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
      <Header titleText="Slot Management App" />
      <View style={styles.container}>
        {notes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any Notes</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <List.Item
                style={{
                  marginTop: "auto",
                  margin: 10,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 10,
                  backgroundColor: getMyColor(item.note.isBooked)
                }}
                title={item.note.noteTitle}
                description={item.note.noteDescription}
                descriptionNumberOfLines={1}
                titleStyle={styles.listTitle}
                onPress={() => loadData(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}

        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add a new Note"
          onPress={() =>
            navigation.navigate("AddNotes", {
              updateSlot
            })
          }
        />
        <Button
          style={styles.fab2}
          onPress={() => loadInitialata()}
          title="Learn More"
          color="#841584"
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

export default ViewNotes;
