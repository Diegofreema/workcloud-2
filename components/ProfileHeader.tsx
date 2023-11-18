import { useUser } from '@clerk/clerk-expo';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';
type Props = {};

export const ProfileHeader = ({}: Props): JSX.Element | undefined => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  if (isLoaded && !user?.id) return;
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Image style={styles.image} source={user?.imageUrl} contentFit="cover" />
      <View>
        <Text variant="titleSmall" style={{ fontWeight: 'bold', fontSize: 17 }}>
          Hi {user?.firstName}
        </Text>
        <Text>Good to have you here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
