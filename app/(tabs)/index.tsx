import { FlatList, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';
import { defaultStyle } from '../../constants';
import { Header } from '../../components/Header';
import { useAuth } from '@clerk/clerk-expo';
import { ProfileHeader } from '../../components/ProfileHeader';
import { colors } from '../../constants/Colors';
import { useFollowers } from '../../lib/queries';
import { ActivityIndicator, Text } from 'react-native-paper';

export default function TabOneScreen() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  const loggedIn = isLoaded && userId;
  const { data, isLoading, isFetching, error, isPending } = useFollowers();
  console.log('ERROR', error);

  console.log(data);

  return (
    <View style={[defaultStyle, styles.container]}>
      <Header />
      {loggedIn && <ProfileHeader />}
      <View style={styles.connections}>
        <View
          style={{
            backgroundColor: colors.gray,
            padding: 2,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}
        >
          <Text>Recent connections</Text>
        </View>
        <Text
          onPress={() => router.push('/connections')}
          style={{ color: colors.buttonBlue, fontWeight: 'bold' }}
        >
          See all connections
        </Text>
      </View>

      {isFetching || isLoading || isPending ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
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
                style={{ fontWeight: 'bold', marginTop: 30 }}
              >
                No connections yet
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
    marginTop: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
