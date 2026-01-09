import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  topic: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Trending', icon: 'flame-outline', topic: '', color: '#EF4444' },
  { id: '2', name: 'Android', icon: 'logo-android', topic: 'android-app', color: '#3DDC84' },
  { id: '3', name: 'iOS', icon: 'logo-apple', topic: 'ios-app', color: '#007AFF' },
  { id: '4', name: 'React Native', icon: 'logo-react', topic: 'react-native', color: '#61DAFB' },
  { id: '5', name: 'Flutter', icon: 'layers-outline', topic: 'flutter', color: '#02569B' },
  { id: '6', name: 'CLI Tools', icon: 'terminal-outline', topic: 'cli', color: '#10B981' },
  { id: '7', name: 'AI/ML', icon: 'hardware-chip-outline', topic: 'machine-learning', color: '#8B5CF6' },
  { id: '8', name: 'Web Apps', icon: 'globe-outline', topic: 'web-app', color: '#F59E0B' },
];

interface CategoryChipProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export function CategoryChip({ category, isSelected, onPress, index }: CategoryChipProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 50,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }, { scale: pressAnim }] },
      ]}
    >
      <Pressable
        style={[
          styles.chip,
          { backgroundColor: isDark ? '#1E293B' : '#F3F4F6' },
          isSelected && { backgroundColor: category.color },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Ionicons
          name={category.icon}
          size={18}
          color={isSelected ? '#fff' : category.color}
        />
        <Text
          style={[
            styles.chipText,
            { color: isDark ? '#CBD5E1' : '#374151' },
            isSelected && styles.chipTextSelected,
          ]}
        >
          {category.name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  chipTextSelected: {
    color: '#fff',
  },
});
