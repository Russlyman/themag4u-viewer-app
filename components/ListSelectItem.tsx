import { GestureResponderEvent } from 'react-native';
import ListItem from './ListItem';
import { Ionicons } from '@expo/vector-icons';

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
          color="#212529"
        />
      )}
    </ListItem>
  );
};

export default ListSelectItem;
