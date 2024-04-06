import { Switch } from 'react-native';
import ListItem from './ListItem';
import { useState } from 'react';
import Colours from '../styles/Colours';

const ListToggle: React.FC<{
  label: string;
}> = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <ListItem {...props}>
      <Switch
        thumbColor={Colours.secondary}
        trackColor={{ false: Colours.background, true: Colours.toggle }}
        ios_backgroundColor={Colours.background}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </ListItem>
  );
};

export default ListToggle;
