import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { defaultStyle } from '../constants';
import { AuthHeader } from '../components/AuthHeader';

type Props = {};

const CreateWorkSpace = (props: Props) => {
  return (
    <View style={[defaultStyle, { flex: 1 }]}>
      <AuthHeader />
      <Text>CreateWorkSpace</Text>
    </View>
  );
};

export default CreateWorkSpace;

const styles = StyleSheet.create({});
