import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { defaultStyle } from '../../constants/index';
import { HeaderNav } from '../../components/HeaderNav';
import { ProfileUpdateForm } from '../../components/Forms/ProfileUpdateForm';

const UpdateProfile = () => {
  const { userId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, ...defaultStyle }}>
      <HeaderNav title="Edit Profile" />
      <ProfileUpdateForm />
    </View>
  );
};

export default UpdateProfile;
