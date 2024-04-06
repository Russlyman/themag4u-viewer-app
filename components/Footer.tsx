import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FooterButton from './FooterButton';
import { router } from 'expo-router';
import Colours from '../styles/Colours';

const Footer: React.FC = props => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          height: 104 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        styles.footerContainer,
      ]}
    >
      <FooterButton
        icon="arrow-back"
        size={64}
      />
      <FooterButton
        icon="arrow-forward"
        size={64}
      />
      <FooterButton
        icon="settings-sharp"
        size={64}
        onPress={() => router.navigate('/settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colours.primary,
  },
});

export default Footer;
