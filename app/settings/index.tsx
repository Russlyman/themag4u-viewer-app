import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsIndex = () => {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
      <View
        style={{
          height: 48,
          paddingHorizontal: 16,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F8F9FA',
        }}
      >
        <Text
          style={{
            color: '#212529',
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
          }}
        >
          Area
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
      </View>
    </View>
  );
};

export default SettingsIndex;
