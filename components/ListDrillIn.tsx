import ListItem from './ListItem';
import { GestureResponderEvent, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListDrillIn: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
}> = props => {
  return (
    <ListItem {...props}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 8,
        }}
      >
        <Text
          style={{
            color: '#ADB5BD',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
          }}
        >
          Todo: Selected Item
        </Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color="#ADB5BD"
        />
      </View>
    </ListItem>
  );
};

export default ListDrillIn;
