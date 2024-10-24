import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import FlashMessage from "react-native-flash-message";
import { TodoProvider } from "@/context/taskContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <TodoProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
          <FlashMessage position="top" />
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerTitle: "App Description" }}
            />
            <Stack.Screen
              name="(todos)"
              options={{ headerTitle: "Todos", headerShown: true }}
            />
          </Stack>
        </ThemeProvider>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}
