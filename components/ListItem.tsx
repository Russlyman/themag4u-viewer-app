import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import Colours from '../constants/Colours';

const ListItem: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  children?: React.ReactNode;
}> = props => {
  const [depressed, setDepressed] = useState(false);

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={() => {
        if (!props.onPress) {
          return;
        }

        setDepressed(true);
      }}
      onPressOut={() => {
        if (!props.onPress) {
          return;
        }

        setDepressed(false);
      }}
      style={[
        {
          backgroundColor: depressed
            ? Colours.controlLightDepressed
            : Colours.secondary,
        },
        styles.listItemContainer,
      ]}
    >
      <Text style={styles.labelText}>{props.label}</Text>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    color: Colours.primary,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
});

export default ListItem;
