import { GestureResponderEvent } from 'react-native';
import ListItem from './ListItem';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../constants/Colours';

const ListSelectItem: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  isSelected: boolean;
}> = props => {
  return (
    <ListItem {...props}>
      {props.isSelected && (
        <Ionicons
          name="checkmark"
          size={32}
          color={Colours.primary}
        />
      )}
    </ListItem>
  );
};

export default ListSelectItem;
