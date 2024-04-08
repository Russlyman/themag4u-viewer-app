import { Switch } from 'react-native';
import ListItem from './ListItem';
import { useState } from 'react';
import Colours from '../styles/Colours';

const ListToggle: React.FC<{
  label: string;
  value: boolean;
  onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;
}> = props => {
  return (
    <ListItem {...props}>
      <Switch
        thumbColor={Colours.secondary}
        trackColor={{ false: Colours.background, true: Colours.toggle }}
        ios_backgroundColor={Colours.background}
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </ListItem>
  );
};

export default ListToggle;
