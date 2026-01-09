import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#38BDF8' : '#0EA5E9',
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#64748B',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 25,
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 0,
          borderWidth: 1.5,
          borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.15)',
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: isDark ? '#38BDF8' : '#0EA5E9',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.4 : 0.2,
          shadowRadius: 20,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={isDark ? 100 : 80}
            tint={isDark ? 'dark' : 'light'}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={26} 
              name={focused ? "compass" : "compass-outline"} 
              color={color}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={26} 
              name={focused ? "search" : "search-outline"} 
              color={color}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={26} 
              name={focused ? "bookmark" : "bookmark-outline"} 
              color={color}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
