import { ScrollView, StyleSheet, View } from 'react-native';
import ListDrillIn from '../../components/ListDrillIn';
import { router } from 'expo-router';
import ListToggle from '../../components/ListToggle';
import { Rounding } from '../../components/ListItem';
import {
  SettingsToggle,
  useSettingsContext,
} from '../../context/SettingsContext';
import { TESTING_DATA } from '../issue';

const SettingsIndex = () => {
  const { state, dispatch } = useSettingsContext();

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      alwaysBounceVertical={false}
    >
      <View style={styles.topContainer}>
        <ListDrillIn
          label="Area"
          currentValue={TESTING_DATA.area[state.area].name}
          onPress={() => router.navigate('/area')}
          rounding={Rounding.Top}
        />
        <ListDrillIn
          label="Issue"
          currentValue={TESTING_DATA.issue[state.issue].name}
          onPress={() => router.navigate('/issue')}
          rounding={Rounding.Bottom}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ListToggle
          label="Swipe to Change Page"
          value={state.swipe}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.Swipe });
          }}
        />
        <ListToggle
          label="Left Hand Mode"
          value={state.leftHand}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.LeftHand });
          }}
        />
        <ListToggle
          label="Notifications for New Issues"
          value={state.notification}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.Notification });
          }}
        />
        <ListToggle
          label="Vibrate on Page Change"
          value={state.vibrate}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.Vibrate });
          }}
        />
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
