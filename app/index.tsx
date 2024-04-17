import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { useLibraryContext } from '../context/LibraryContext';

const Index = () => {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useLibraryContext();

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
