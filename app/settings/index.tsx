import { ScrollView, StyleSheet, View } from 'react-native';
import ListDrillIn from '../../components/ListDrillIn';
import { router } from 'expo-router';
import ListToggle from '../../components/ListToggle';
import { Rounding } from '../../components/ListItem';
import {
  SettingsToggle,
  useSettingsContext,
} from '../../context/SettingsContext';
import { useLibraryContext } from '../../context/LibraryContext';

const SettingsIndex = () => {
  const { state, dispatch } = useSettingsContext();
  const { state: libraryState, dispatch: libraryDispatch } =
    useLibraryContext();

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      alwaysBounceVertical={false}
    >
      <View style={styles.topContainer}>
        <ListDrillIn
          label="Area"
          currentValue={libraryState.library.area[libraryState.areaId].name}
          onPress={() => router.navigate('/area')}
          rounding={Rounding.Top}
        />
        <ListDrillIn
          label="Issue"
          currentValue={libraryState.library.issue[libraryState.issueId].name}
          onPress={() => router.navigate('/issue')}
          rounding={Rounding.Bottom}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ListToggle
          label="Swipe to Change Page"
          value={state.enableSwipe}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.Swipe });
          }}
        />
        <ListToggle
          label="Left Hand Mode"
          value={state.enableLeftHand}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.LeftHand });
          }}
        />
        <ListToggle
          label="Notifications for New Issues"
          value={state.enableNotifications}
          onValueChange={() => {
            dispatch({ type: SettingsToggle.Notifications });
          }}
        />
        <ListToggle
          label="Vibrate on Page Change"
          value={state.enableVibrate}
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
