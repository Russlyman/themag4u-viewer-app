import ListItem from './ListItem';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../styles/Colours';

const ListDrillIn: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
}> = props => {
  return (
    <ListItem {...props}>
      <View style={styles.currentValueContainer}>
        <Text style={styles.currentValueText}>Todo: Selected Item</Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={Colours.controlCurrentValue}
        />
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  currentValueText: {
    color: Colours.controlCurrentValue,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  currentValueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
});

export default ListDrillIn;
