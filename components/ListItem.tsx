import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const ListItem: React.FC<{
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  label: string;
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
      style={{
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: depressed ? '#C6C7C8' : '#F8F9FA',
      }}
    >
      <Text
        style={{
          color: '#212529',
          fontFamily: 'Inter_600SemiBold',
          fontSize: 16,
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 8,
        }}
      >
        <Text
          style={{
            color: '#ADB5BD',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
          }}
        >
          Coventry West
        </Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color="#ADB5BD"
        />
      </View>
    </Pressable>
  );
};

export default ListItem;
