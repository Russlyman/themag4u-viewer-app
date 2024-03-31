import { View } from 'react-native';
import ListItem from '../../components/ListItem';

const SettingsIndex = () => {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
      <ListItem label="Area" />
      <ListItem label="Issue" />
    </View>
  );
};

export default SettingsIndex;
