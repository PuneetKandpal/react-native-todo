// CompletedScreen.tsx
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
  } from "react-native";
  import React, { useRef } from "react";
  import { Stack } from "expo-router";
  import TaskCard from "@/components/taskCard";
  import AddNewTask from "@/components/addNewTask";
  import { useTodo } from "@/context/taskContext"; // Import the context
  
  const TodoScreen = () => {
    const { taskList, addTask, updateTask, toggleTask, deleteTask } = useTodo(); // Use the context
    const flatListRef = useRef<FlatList>(null);
    
    const completedTaskList = taskList.filter(item => item.completed === true);

    const handleAddTodo = () => {
      addTask("New task", "This is a new task.", true); 
      if (flatListRef.current  && completedTaskList.length > 0) {
        flatListRef.current.scrollToIndex({ index: 0, animated: true });
      }
    };
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Stack.Screen options={{ headerTitle: "Completed", headerShown: true }} />
        <AddNewTask handleAddTask={handleAddTodo} />
        <FlatList
          ref={flatListRef}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              toggleTask={toggleTask}
              handleUpdateDescription={(id, desc) => updateTask(id, item.title, desc)}
              handleUpdateTitle={(id, title) => updateTask(id, title, item.description)}
              handleDeleteTask={deleteTask}
            />
          )}
          data={completedTaskList}
          keyExtractor={(item) => item.id.toString()}
        />
      </KeyboardAvoidingView>
    );
  };
  
  export default TodoScreen;
  
  const styles = StyleSheet.create({});
  