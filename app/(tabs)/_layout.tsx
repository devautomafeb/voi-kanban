import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#121212',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Barlow-Condensed',
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome name={focused ? 'folder-open' : 'folder'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="stop"
        options={{
          title: 'Não',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'ban' : 'ban'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Idéias',
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons name={focused ? 'lightbulb-on' : 'lightbulb-on-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name={focused ? 'info' : 'info-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
