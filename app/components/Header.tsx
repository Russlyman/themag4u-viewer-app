import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import Button from './Button';

const Header: React.FC<NativeStackHeaderProps> = props => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: 72 + insets.top,
        paddingTop: insets.top,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212529',
      }}
    >
      {props.back && (
        <Button
          icon="chevron-back"
          size={48}
          onPress={props.navigation.goBack}
          style={{
            position: 'absolute',
            left: 4,
            bottom: 72 / 2,
            transform: [{ translateY: 24 }],
          }}
        />
      )}
      <Text
        style={{
          color: '#F8F9FA',
          fontFamily: 'Inter_700Bold',
          fontSize: 23.04,
        }}
      >
        {props.options.title}
      </Text>
    </View>
  );
};

export default Header;
