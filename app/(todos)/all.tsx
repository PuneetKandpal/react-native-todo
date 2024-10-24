// import {
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useRef } from "react";
// import { Stack } from "expo-router";
// import TaskCard from "@/components/taskCard";
// import { TaskType } from "@/@types/types";
// import AddNewTask from "@/components/addNewTask";
// import { GeneralHelper } from "@/helpers/general.helper";

// const dummyTasks: TaskType[] = [
//   {
//     id: "jsjsjjsjjjss0",
//     title: "Buy milk",
//     description:
//       "Milk is a nutritious dairy product that is rich in calcium, vitamin D, and other nutrients.",
//     completed: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "jsjsjjsjjjss1",
//     title: "Go to the gym",
//     description: "Regular exercise is essential for maintaining good health.",
//     completed: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "jsjsjjsjjjss2",
//     title: "Learn a new language",
//     description:
//       "Learning a new language can open up new opportunities and improve cognitive function.",
//     completed: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "jsjsjjsjjjss3",
//     title: "Read a book",
//     description:
//       "Reading is a great way to improve cognitive function and expand your knowledge.",
//     completed: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "jsjsjjsjjjss4",
//     title: "Take a nap",
//     description:
//       "Getting enough sleep is essential for maintaining good health.",
//     completed: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "jsjsjjsjjjss5",
//     title: "Eat a healthy breakfast",
//     description:
//       "Eating a healthy breakfast can provide the energy and nutrients your body needs to function properly.",
//     completed: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// const TodoScreen = () => {
//   const [taskList, setTaskList] = React.useState<TaskType[]>(dummyTasks);
//   const flatListRef = useRef<FlatList<TaskType>>(null);

//   const handleAddTodo = () => {
//     const newTodo = {
//       id: GeneralHelper.generateRandomId(),
//       title: "New task",
//       description: "This is a new task.",
//       completed: false,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     setTaskList((prevTasks) => {
//       const updatedTasks = [newTodo, ...prevTasks];
//       // Scroll to the newly added task
//       if (flatListRef.current) {
//         flatListRef.current.scrollToIndex({ index: 0, animated: true }); // Scroll to the first item
//       }
//       return updatedTasks;
//     });
//   };

//   const handleDeleteTodo = (id: string) => {
//     setTaskList(taskList.filter((todo) => todo.id !== id));
//   };

//   const isTaskExist = (id: string) => {
//     return taskList.some((todo) => todo.id === id);
//   };

//   const updateLastUpdateTime = (id: string) => {
//     setTaskList(
//       taskList.map((todo) =>
//         todo.id === id ? { ...todo, updatedAt: new Date() } : todo
//       )
//     );
//   };

//   const handleUpdateTitle = (id: string, newTitle: string) => {
//     if (!isTaskExist(id)) {
//       console.warn("Task not exist");
//       return;
//     }

//     updateLastUpdateTime(id);
//     setTaskList(
//       taskList.map((todo) =>
//         todo.id === id ? { ...todo, title: newTitle } : todo
//       )
//     );
//   };

//   const handleUpdateDescription = (id: string, newDescription: string) => {
//     if (!isTaskExist(id)) {
//       console.warn("Task not exist");
//       return;
//     }
//     updateLastUpdateTime(id);
//     setTaskList(
//       taskList.map((todo) =>
//         todo.id === id ? { ...todo, description: newDescription } : todo
//       )
//     );
//   };

//   const handleToggleTodo = (id: string) => {
//     if (!isTaskExist(id)) {
//       console.warn("Task not exist");
//       return;
//     }
//     updateLastUpdateTime(id);
//     setTaskList(
//       taskList.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <Stack.Screen options={{ headerTitle: "Home", headerShown: false }} />
//       <AddNewTask handleAddTask={handleAddTodo} />
//       <FlatList
//         ref={flatListRef}
//         renderItem={({ item }) => (
//           <TaskCard
//             task={item}
//             toggleTask={handleToggleTodo}
//             handleUpdateDescription={handleUpdateDescription}
//             handleUpdateTitle={handleUpdateTitle}
//             handleDeleteTask={handleDeleteTodo}
//           />
//         )}
//         data={taskList}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </KeyboardAvoidingView>
//   );
// };

// export default TodoScreen;

// const styles = StyleSheet.create({});




// TodoScreen.tsx
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

  const handleAddTodo = () => {
    addTask("New task", "This is a new task." ); // Use the context function
    if (flatListRef.current && taskList.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{ headerTitle: "Home", headerShown: false }} />
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
        data={taskList}
        keyExtractor={(item) => item.id.toString()}
      />
    </KeyboardAvoidingView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
