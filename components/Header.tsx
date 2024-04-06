import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import Button from './FooterButton';
import Colours from '../styles/Colours';

const Header: React.FC<NativeStackHeaderProps> = props => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          height: 72 + insets.top,
          paddingTop: insets.top,
        },
        styles.headerContainer,
      ]}
    >
      {props.back && (
        <Button
          icon="chevron-back"
          size={48}
          onPress={props.navigation.goBack}
          style={styles.backButton}
        />
      )}
      <Text style={styles.headerTitle}>{props.options.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.primary,
  },
  backButton: {
    position: 'absolute',
    left: 4,
    bottom: 72 / 2,
    transform: [{ translateY: 24 }],
  },
  headerTitle: {
    color: Colours.secondary,
    fontFamily: 'Inter_700Bold',
    fontSize: 23.04,
  },
});

export default Header;
