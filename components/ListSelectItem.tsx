import { GestureResponderEvent } from 'react-native';
import ListItem, { Rounding } from './ListItem';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../styles/Colours';

const ListSelectItem: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  isSelected: boolean;
  rounding?: Rounding;
  disabled: boolean;
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
