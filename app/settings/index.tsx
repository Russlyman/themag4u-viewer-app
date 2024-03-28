import { Stack } from 'expo-router';
import { View } from 'react-native';

const SettingsIndex = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
      />
    </View>
  );
};

export default SettingsIndex;
