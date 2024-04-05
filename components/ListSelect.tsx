import Colours from '../constants/Colours';
import ListItem from './ListItem';
import { Ionicons } from '@expo/vector-icons';

const ListSelect: React.FC<{
  label: string;
  id: number;
  onSelect: (id: number) => void;
  currentSelection: number;
}> = props => {
  return (
    <ListItem
      onPress={() => {
        props.onSelect(props.id);
      }}
      {...props}
    >
      {props.currentSelection === props.id && (
        <Ionicons
          name="checkmark"
          size={32}
          color={Colours.primary}
        />
      )}
    </ListItem>
  );
};

export default ListSelect;
