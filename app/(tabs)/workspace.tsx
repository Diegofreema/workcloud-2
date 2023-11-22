import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { WorkCloudHeader } from '../../components/WorkCloudHeader';
import { useOrgs } from '../../lib/queries';

type Props = {};

const workspace = (props: Props) => {
  const { darkMode } = useDarkMode();
  const { data, isFetching, isLoading, isPending } = useOrgs();
  return (
    <View style={{ flex: 1 }}>
      <WorkCloudHeader />
    </View>
  );
};

export default workspace;

const styles = StyleSheet.create({});
