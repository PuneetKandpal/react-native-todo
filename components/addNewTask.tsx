import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AddNewTask = ({ handleAddTask }: { handleAddTask: () => void }) => {
  return (
    <Pressable style={styles.addTaskContainer} onPress={handleAddTask} android_ripple={{ color: 'lightblue' }}>
      <Text style={styles.addTaskText}>Add New Task</Text>
    </Pressable>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({
  addTaskContainer: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    paddingVertical: 15, 
    paddingHorizontal: 25, 
    borderRadius: 25, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4,
  },
  addTaskText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});
