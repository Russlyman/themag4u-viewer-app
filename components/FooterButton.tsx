import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Colours from '../styles/Colours';

const FooterButton: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
    | undefined;
}> = props => {
  const [depressed, setDepressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => {
        setDepressed(true);
      }}
      onPressOut={() => {
        setDepressed(false);
      }}
      onPress={props.onPress}
      style={props.style}
    >
      <Ionicons
        name={props.icon}
        size={props.size}
        color={depressed ? Colours.controlLightDepressed : Colours.secondary}
      />
    </Pressable>
  );
};

export default FooterButton;
