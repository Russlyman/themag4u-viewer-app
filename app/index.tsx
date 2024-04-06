import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
        },
        styles.mainContainer,
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.magViewContainer}></View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  magViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Index;
