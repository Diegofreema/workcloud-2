import { FlatList, StyleSheet, View } from 'react-native';

import { useFocusEffect, useRouter } from 'expo-router';
import { defaultStyle } from '../../constants';
import { Header } from '../../components/Header';
import { useAuth } from '@clerk/clerk-expo';
import { ProfileHeader } from '../../components/ProfileHeader';
import { colors } from '../../constants/Colors';
import { useFollowers, usePersonalOrgs } from '../../lib/queries';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useContext, useCallback, useEffect, useLayoutEffect } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useOrganizationModal } from '../../hooks/useOrganizationModal';
import { OrganizationModal } from '../../components/OrganizationModal';

export default function TabOneScreen() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const { data: orgs } = usePersonalOrgs();

  const loggedIn = isLoaded && !!userId;
  const { onOpen } = useOrganizationModal();

  useFocusEffect(
    useCallback(() => {
      if (orgs?.orgs.length === 0) {
        onOpen();
      }
    }, [])
  );
  const { data, isLoading, isFetching, error, isPending } = useFollowers();
  const { darkMode } = useDarkMode();
  return (
    <View style={[defaultStyle, styles.container]}>
      <OrganizationModal />
      <Header />
      {loggedIn && <ProfileHeader />}
      {loggedIn ? (
        <View style={styles.connections}>
          <View
            style={{
              backgroundColor: darkMode ? colors.black : colors.gray,
              padding: 2,
              paddingHorizontal: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: darkMode ? 'white' : 'black' }}>
              Recent connections
            </Text>
          </View>
          <Text
            onPress={() => router.push('/connections')}
            style={{ color: colors.buttonBlue, fontWeight: 'bold' }}
          >
            See all connections
          </Text>
        </View>
      ) : (
        <Text style={{ color: darkMode ? 'white' : 'black' }}>
          Login in to see your connections
        </Text>
      )}

      {isFetching || isLoading || isPending ? (
        <ActivityIndicator style={{ marginTop: 20 }} animating />
      ) : (
        <FlatList
          contentContainerStyle={{
            gap: 10,

            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={data?.connections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <Text
                variant="titleLarge"
                style={{
                  fontWeight: 'bold',
                  marginTop: 30,
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {loggedIn ? 'No connections yet' : ''}
              </Text>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  connections: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
});
