import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import Colours from '../styles/Colours';

const ListItem: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  children?: React.ReactNode;
  rounding?: Rounding;
  disabled?: boolean;
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
        props.rounding === Rounding.Top && styles.roundingTop,
        props.rounding === Rounding.Bottom && styles.roundingBottom,
        props.rounding === undefined && styles.roundingAll,
      ]}
    >
      <Text style={[styles.labelText, props.disabled && styles.disabledText]}>
        {props.label}
      </Text>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  roundingAll: {
    borderRadius: 8,
  },
  roundingTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  roundingBottom: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  listItemContainer: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    color: Colours.primary,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 16 + 16 * 0.6,
  },
  disabledText: {
    color: Colours.controlCurrentValue,
  },
});

export enum Rounding {
  Top,
  Bottom,
  None,
}

export default ListItem;
