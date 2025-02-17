import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import { GoalContextProvider } from "./hooks/goals";
import { TaskContextProvider } from "./hooks/tasksHook";
import { StopContextProvider } from "./hooks/stopHook";
import { IdeaContextProvider } from "./hooks/ideaHook";
import { ThemeProvider } from './hooks/themeContext'; 
import { GlobalFontProvider } from './hooks/fontHook';  // Importa o GlobalFontProvider
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();  // Impede que a SplashScreen seja escondida automaticamente

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GoalContextProvider>
        <TaskContextProvider>
          <StopContextProvider>
            <IdeaContextProvider>
              <GlobalFontProvider>
                <Stack
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#030303',
                    },
                    headerTintColor: '#fefefe',
                    headerTitleStyle: {
                      fontSize: 20,
                      fontFamily: 'Barlow-Condensed',  
                    },
                  }}>
                  <Stack.Screen 
                    name="(tabs)" 
                    options={{ 
                      title: "Voi",
                      headerTitleStyle: { 
                        fontFamily: 'Barlow-Condensed',
                        fontSize: 24,
                      },
                    }} 
                  />
                  <Stack.Screen name="index" options={{ title: " " }} />
                </Stack>
              </GlobalFontProvider>
            </IdeaContextProvider>
          </StopContextProvider>
        </TaskContextProvider>
      </GoalContextProvider>
    </ThemeProvider>
  );
}
