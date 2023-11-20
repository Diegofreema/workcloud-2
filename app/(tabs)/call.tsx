import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

type Props = {};

const call = (props: Props) => {
  const { darkMode } = useDarkMode();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: darkMode ? 'white' : 'black',
        }}
      >
        No calls yet
      </Text>
    </View>
  );
};

export default call;

const styles = StyleSheet.create({});
