import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import RepoCard from '@/components/RepoCard';
import EmptyState from '@/components/EmptyState';
import { useFavoritesStore } from '@/store/favorites';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function FavoritesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { favorites, clearFavorites } = useFavoritesStore();
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClearAll = () => {
    clearFavorites();
  };

  const themeColors = {
    background: isDark ? '#0F172A' : '#F8FAFC',
    text: isDark ? '#F1F5F9' : '#111827',
    subtext: isDark ? '#94A3B8' : '#6B7280',
    clearBg: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [{
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              }],
            },
          ]}
        >
          <BlurView
            intensity={isDark ? 60 : 40}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 }}>
            <Text style={[styles.title, { color: themeColors.text }]}>Favorites</Text>
            <Text style={[styles.subtitle, { color: themeColors.subtext }]}>Your saved repositories</Text>
          </View>
        </Animated.View>
        
        <EmptyState
          icon="heart-outline"
          title="No Favorites Yet"
          subtitle="Start exploring and save repositories you like by tapping the heart icon."
          actionLabel="Explore"
          onAction={() => router.push('/')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [{
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            }],
          },
        ]}
      >
        <BlurView
          intensity={isDark ? 60 : 40}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.title, { color: themeColors.text }]}>Favorites</Text>
            <Text style={[styles.subtitle, { color: themeColors.subtext }]}>{favorites.length} saved repositories</Text>
          </View>
          
          {favorites.length > 0 && (
            <Pressable style={[styles.clearButton, { backgroundColor: themeColors.clearBg }]} onPress={handleClearAll}>
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
              <Text style={styles.clearText}>Clear All</Text>
            </Pressable>
          )}
        </View>
      </Animated.View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RepoCard repo={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 100,
    gap: 4,
  },
});
