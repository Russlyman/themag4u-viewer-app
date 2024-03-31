import { Slot, Stack } from 'expo-router';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SettingsLayout() {
  return (
    <>
      <StatusBar
        style="light"
        animated={true}
      />
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
      />
      <Slot />
    </>
  );
}
