import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoadingSpinner() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    spin.start();
    pulse.start();

    return () => {
      spin.stop();
      pulse.stop();
    };
  }, []);

  const rotation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#fff' }]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: rotation }, { scale: pulseAnim }],
          },
        ]}
      >
        <Ionicons name="sync" size={40} color={isDark ? '#38BDF8' : '#2563EB'} />
      </Animated.View>
      <Animated.Text style={[styles.text, { opacity: pulseAnim, color: isDark ? '#94A3B8' : '#6B7280' }]}>
        Loading...
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinner: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});
