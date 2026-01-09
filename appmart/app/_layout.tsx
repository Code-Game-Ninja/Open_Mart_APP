import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import VideoSplash from '@/components/VideoSplash';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="details/[id]" 
              options={{ 
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                animation: 'slide_from_right',
              }} 
            />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          {showSplash && <VideoSplash onFinish={() => setShowSplash(false)} />}
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
