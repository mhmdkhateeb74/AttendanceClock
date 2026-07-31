import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerPosition: 'right',
        headerTitleAlign: 'center',
        drawerLabelStyle: { textAlign: 'right' },
        drawerActiveTintColor: '#2767d8',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'שעון נוכחות',
          drawerLabel: 'דף הבית',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'פרופיל',
          drawerLabel: 'פרופיל',
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'אודות',
          drawerLabel: 'אודות',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} />,
        }}
      />
    </Drawer>
  );
}
