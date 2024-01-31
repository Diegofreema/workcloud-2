import { View, Text } from 'react-native';
import React from 'react';
import { defaultStyle } from '../constants/index';
import { HeaderNav } from '../components/HeaderNav';

type Props = {};

const settings = (props: Props) => {
  return (
    <View style={{ flex: 1, ...defaultStyle }}>
      <HeaderNav title="Settings" />
    </View>
  );
};

export default settings;
