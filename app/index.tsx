import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Markdown from "react-native-markdown-display";
import { Link } from "expo-router";

const appDescription = `
## TODO app

**This is a simple TODO app that uses React Native and Expo.**

### Features
 - Hello 
 - test
 - test hello
 - Hello 
 - test
 - test hello
 - Hello 
 - test
 - test hello
`;

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the TODO app!</Text>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}
      >
        <Markdown>{appDescription}</Markdown>
      </ScrollView>

      <Link href={{ pathname: "/(todos)/all" }} asChild>
        <Button title="Go to App" color="#841584" />
      </Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-start",
  },
  scroll: {
    height: "auto",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appLinkButton: {
    margin: 5,
    borderRadius: 5,
  },
  markdown:{
    color: "fff"
  }
});
