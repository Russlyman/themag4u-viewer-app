import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './components/Header';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          header: Header,
          contentStyle: { backgroundColor: '#E9ECEF' },
        }}
      />
    </SafeAreaProvider>
  );
}
