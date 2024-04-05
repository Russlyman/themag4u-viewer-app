import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
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
      style={{
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: depressed
          ? Colours.controlLightDepressed
          : Colours.secondary,
      }}
    >
      <Text
        style={{
          color: Colours.primary,
          fontFamily: 'Inter_600SemiBold',
          fontSize: 16,
        }}
      >
        {props.label}
      </Text>
      {props.children}
    </Pressable>
  );
};

export default ListItem;
