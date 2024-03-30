import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

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
        color={depressed ? '#C6C7C8' : '#F8F9FA'}
      />
    </Pressable>
  );
};

export default FooterButton;
