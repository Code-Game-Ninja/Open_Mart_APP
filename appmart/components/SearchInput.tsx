import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search repositories...',
  autoFocus = false,
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: isDark ? ['#334155', '#3B82F6'] : ['#E5E7EB', '#2563EB'],
  });

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <Animated.View style={[styles.container, { borderColor, backgroundColor: isDark ? '#1E293B' : '#F9FAFB' }]}>
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? (isDark ? '#3B82F6' : '#2563EB') : (isDark ? '#64748B' : '#9CA3AF')}
        style={styles.searchIcon}
      />
      
      <TextInput
        style={[styles.input, { color: isDark ? '#F1F5F9' : '#111827' }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#64748B' : '#9CA3AF'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value.length > 0 && (
        <Pressable onPress={handleClear} hitSlop={10}>
          <Ionicons name="close-circle" size={20} color={isDark ? '#64748B' : '#9CA3AF'} />
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    height: '100%',
  },
});
