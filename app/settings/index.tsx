import { ScrollView, StyleSheet, View } from 'react-native';
import ListDrillIn from '../../components/ListDrillIn';
import { router } from 'expo-router';
import ListToggle from '../../components/ListToggle';
import { Rounding } from '../../components/ListItem';
import { Action, useSettingsContext } from '../../context/SettingsContext';

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
          currentValue="Todo: Value From Context"
          onPress={() => router.navigate('/area')}
          rounding={Rounding.Top}
        />
        <ListDrillIn
          label="Issue"
          currentValue="Todo: Value From Context"
          onPress={() => router.navigate('/issue')}
          rounding={Rounding.Bottom}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ListToggle
          label="Swipe to Change Page"
          value={state.swipe}
          onValueChange={() => {
            dispatch({ type: Action.ToggleSwipe });
          }}
        />
        <ListToggle
          label="Left Hand Mode"
          value={state.leftHand}
          onValueChange={() => {
            dispatch({ type: Action.ToggleLeftHand });
          }}
        />
        <ListToggle
          label="Notifications for New Issues"
          value={state.notification}
          onValueChange={() => {
            dispatch({ type: Action.ToggleNotification });
          }}
        />
        <ListToggle
          label="Vibrate on Page Change"
          value={state.vibrate}
          onValueChange={() => {
            dispatch({ type: Action.ToggleVibrate });
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
