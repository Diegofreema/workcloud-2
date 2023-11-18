import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {};

const call = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No calls yet</Text>
    </View>
  );
};

export default call;

const styles = StyleSheet.create({});
