import { View } from 'react-native';
import ListDrillIn from '../../components/ListDrillIn';

const SettingsIndex = () => {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
      <ListDrillIn label="Area" />
      <ListDrillIn label="Issue" />
    </View>
  );
};

export default SettingsIndex;
