import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {};

const workspace = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        No workspaces yet
      </Text>
    </View>
  );
};

export default workspace;

const styles = StyleSheet.create({});
