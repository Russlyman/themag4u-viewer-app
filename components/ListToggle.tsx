import { Switch } from 'react-native';
import ListItem from './ListItem';
import { useState } from 'react';

const ListToggle: React.FC<{
  label: string;
}> = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <ListItem {...props}>
      <Switch
        thumbColor="#F8F9FA"
        trackColor={{ false: '#E9ECEF', true: '#74C0FC' }}
        ios_backgroundColor="#E9ECEF"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </ListItem>
  );
};

export default ListToggle;
