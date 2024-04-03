import { View } from 'react-native';
import ListDrillIn from '../../components/ListDrillIn';
import { router } from 'expo-router';

const SettingsIndex = () => {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
      <ListDrillIn
        label="Issue"
        onPress={() => router.navigate('/issue')}
      />
    </View>
  );
};

export default SettingsIndex;
