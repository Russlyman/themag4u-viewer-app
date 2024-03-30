import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      ></View>

      <Footer />
    </View>
  );
};

export default Index;
