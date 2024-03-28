import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';
import { router } from 'expo-router';

const Footer: React.FC = props => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: 104 + insets.bottom,
        paddingBottom: insets.bottom,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#212529',
      }}
    >
      <Button
        icon="arrow-back"
        size={64}
      />
      <Button
        icon="arrow-forward"
        size={64}
      />
      <Button
        icon="settings-sharp"
        size={64}
        onPress={() => router.navigate('/settings')}
      />
    </View>
  );
};

export default Footer;
