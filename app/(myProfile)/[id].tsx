import { View, Text } from 'react-native';
import React from 'react';
import { HeaderNav } from '../../components/HeaderNav';
import { defaultStyle } from '../../constants/index';

type Props = {};

const MyProfile = (props: Props) => {
  return (
    <View style={{ flex: 1, ...defaultStyle }}>
      <HeaderNav title="Profile" />
    </View>
  );
};

export default MyProfile;
