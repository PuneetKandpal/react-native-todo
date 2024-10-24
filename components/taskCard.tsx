import { TaskType } from "@/@types/types";
import { GeneralHelper } from "@/helpers/general.helper";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Directions, Swipeable } from "react-native-gesture-handler";

const TaskCard = ({
  task,
  toggleTask,
  handleUpdateTitle,
  handleUpdateDescription,
  handleDeleteTask,
}: {
  task: TaskType;
  toggleTask: (taskId: string) => void;
  handleUpdateTitle: (taskId: string, newTitle: string) => void;
  handleUpdateDescription: (taskId: string, newDescription: string) => void;
  handleDeleteTask: (taskId: string) => void;
}) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleTaskStatusChange = () => {
    setIsEditingDescription(false);
    setIsEditingTitle(false);
    toggleTask(task.id);
  };

  const handleSaveDescription = () => {
    Keyboard.dismiss();
    if (newDescription !== task.description) {
      handleUpdateDescription(task.id, newDescription);
      GeneralHelper.showToast("Description updated successfully!", "success");
    }
    setIsEditingDescription(false);
  };

  const handleCancelSaveDescription = () => {
    setIsEditingDescription(false);
  };

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    if (newTitle !== task.title) {
      handleUpdateTitle(task.id, newTitle);
      GeneralHelper.showToast("Title updated successfully!", "success");
    }
  };

  const handleDelete = () => {
    handleDeleteTask(task.id);
    GeneralHelper.showToast("Task deleted successfully!", "success");
  };

  // Function to render right actions for swipeable
  const renderRightActions = () => {
    return (
      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete} // Call delete function
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    );
  };

  return (
    <Swipeable 
    renderRightActions={renderRightActions}>
      <View
        style={[
          styles.card,
          {
            opacity: task.completed ? 0.5 : 1,
          },
        ]}
      >
        <Pressable style={styles.titleContainer}>
          <BouncyCheckbox
            size={35}
            key={task.completed+""}
            fillColor="green"
            unfillColor="#ffffff"
            isChecked={task.completed}
            style={{ flexDirection: "row", alignItems: "center" }}
            innerIconStyle={{
              borderWidth: 2,
              borderColor: task.completed ? "green" : "red",
            }}
            textComponent={
              isEditingTitle ? (
                <TextInput
                  style={styles.titleInput}
                  value={newTitle}
                  onChangeText={setNewTitle}
                  onBlur={handleSaveTitle} // Save when focus is lost
                  autoFocus
                />
              ) : (
                <Pressable
                  onPress={() => setIsEditingTitle(true)}
                  pointerEvents={task.completed ? "none" : "auto"}
                >
                  <Text style={styles.title}>{task.title}</Text>
                </Pressable>
              )
            }
            onPress={handleTaskStatusChange}
          />
        </Pressable>

        {isEditingDescription ? (
          <View style={styles.descriptionInputContainer}>
            <TextInput
              style={styles.descriptionInput}
              multiline={true}
              numberOfLines={2}
              value={newDescription}
              onChangeText={setNewDescription}
              autoFocus
            />
            <View style={styles.descriptionButtonContainer}>
              <Button title="Save" onPress={handleSaveDescription} />
              <Button
                title="Cancel"
                onPress={handleCancelSaveDescription}
                color={"red"}
              />
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => setIsEditingDescription(true)}
            pointerEvents={task.completed ? "none" : "auto"}
          >
            <Text style={styles.description}>{task.description}</Text>
          </Pressable>
        )}

        <Text style={styles.status}>
          Status: {task.completed ? "Completed" : "Not Completed"}
        </Text>
        <Text style={styles.date}>
          Created At: {task.createdAt.toLocaleString()}
        </Text>
        <Text style={styles.date}>
          Updated At: {task.updatedAt.toLocaleString()}
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    marginTop: 10,
    borderRadius: 12,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    color: "#333",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  status: {
    fontSize: 14,
    color: "#007BFF",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  descriptionInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 0,
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
    elevation: 0,
    //@ts-ignore - web only
    outlineStyle: "none",
  },
  descriptionInputContainer: {
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  descriptionButtonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    color: "#666",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    elevation: 0,
    //@ts-ignore - web only
    outlineStyle: "none",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 80,
    height: "96%",
    borderRadius: 12,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskCard;
