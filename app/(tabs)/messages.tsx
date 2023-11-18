import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {};

const messages = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No messages yet</Text>
    </View>
  );
};

export default messages;

const styles = StyleSheet.create({});
