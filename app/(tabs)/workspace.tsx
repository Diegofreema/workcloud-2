import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { WorkCloudHeader } from '../../components/WorkCloudHeader';
import { usePersonalOrgs } from '../../lib/queries';
import { Text } from 'react-native-paper';
import { defaultStyle } from '../../constants';
import { WorkspaceItem } from '../../components/WorkspaceItem';
import { EmptyText } from '../../components/EmptyText';

type Props = {};

const workspace = (props: Props) => {
  const { darkMode } = useDarkMode();
  const { data, isFetching, isLoading, isPending, refetch } = usePersonalOrgs();
  console.log(data);

  return (
    <View style={{ flex: 1, ...defaultStyle }}>
      <WorkCloudHeader />
      <View style={{ marginTop: 20 }}>
        <FlatList
          ListHeaderComponent={() => (
            <Text
              style={{
                fontWeight: 'bold',
                color: darkMode ? 'white' : 'black',
              }}
              variant="titleMedium"
            >
              Your organizations
            </Text>
          )}
          stickyHeaderHiddenOnScroll
          contentContainerStyle={{ paddingVertical: 20, gap: 10 }}
          data={data?.orgs}
          renderItem={({ item }) => <WorkspaceItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <EmptyText text="You have no organizations yet" />
          )}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: darkMode ? 'white' : 'black',
          }}
          variant="titleMedium"
        >
          Assigned organizations
        </Text>
      </View>
    </View>
  );
};

export default workspace;

const styles = StyleSheet.create({});
