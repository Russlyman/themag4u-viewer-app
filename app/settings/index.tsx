import { ScrollView, StyleSheet, View } from 'react-native';
import ListDrillIn from '../../components/ListDrillIn';
import { router } from 'expo-router';
import ListToggle from '../../components/ListToggle';
import { Rounding } from '../../components/ListItem';

const SettingsIndex = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      alwaysBounceVertical={false}
    >
      <View style={styles.topContainer}>
        <ListDrillIn
          label="Area"
          onPress={() => router.navigate('/area')}
          rounding={Rounding.Top}
        />
        <ListDrillIn
          label="Issue"
          onPress={() => router.navigate('/issue')}
          rounding={Rounding.Bottom}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ListToggle label="Swipe to Change Page" />
        <ListToggle label="Left Hand Mode" />
        <ListToggle label="Notifications for New Issues" />
        <ListToggle label="Vibrate on Page Change" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    rowGap: 32,
  },
  topContainer: { rowGap: 1 },
  bottomContainer: { rowGap: 16 },
});

export default SettingsIndex;
