import React, { useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Animated, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface VideoSplashProps {
  onFinish: () => void;
}

export default function VideoSplash({ onFinish }: VideoSplashProps) {
  // Animation values
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(0.3)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animation sequence
    Animated.sequence([
      // 1. Icon appears with spring effect
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      
      // 2. Title slides up
      Animated.parallel([
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // 3. Subtitle fades in
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      // 4. Wait
      Animated.delay(1500),

      // 5. Fade everything out
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(({ finished }) => {
      if (finished) {
        onFinish();
      }
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <LinearGradient
        colors={['#0F172A', '#1E1B4B', '#312E81']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View 
          style={[
            styles.content,
            { 
              transform: [{ scale: iconScale }],
              opacity: iconOpacity
            }
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="bag-handle" size={80} color="#60A5FA" />
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.textContainer,
            { 
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }]
            }
          ]}
        >
          <Text style={styles.title}>AppMart</Text>
          <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
            Welcome to the Store
          </Animated.Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1.5,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#93C5FD',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
});
