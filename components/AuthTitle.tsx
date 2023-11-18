import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};

export const AuthTitle = ({ children }: Props): JSX.Element => {
  return (
    <Text variant="titleLarge" style={{ fontWeight: 'bold', maxWidth: 200 }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});
