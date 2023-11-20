import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { WorkCloudHeader } from '../../components/WorkCloudHeader';

type Props = {};

const workspace = (props: Props) => {
  const { darkMode } = useDarkMode();
  return (
    <View style={{ flex: 1 }}>
      <WorkCloudHeader />
    </View>
  );
};

export default workspace;

const styles = StyleSheet.create({});
