import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { defaultStyle } from '../constants';
import { useDarkMode } from '../hooks/useDarkMode';
import { useRouter } from 'expo-router';
import { colors } from '../constants/Colors';

type Props = {};

export const WorkCloudHeader = ({}: Props): JSX.Element => {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  return (
    <>
      <View
        style={[
          defaultStyle,
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}
      >
        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}
        >
          {' '}
          Organizations
        </Text>
        <Pressable
          onPress={() => router.push('/search')}
          style={({ pressed }) => pressed && { opacity: 0.5 }}
        >
          <FontAwesome
            name="search"
            size={30}
            color={darkMode ? 'white' : 'black'}
          />
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.push('/create-workspace')}
        style={[
          defaultStyle,
          {
            flexDirection: 'row',
            gap: 10,
            marginTop: 13,
            alignItems: 'center',
          },
        ]}
      >
        <View style={styles.briefcase}>
          <FontAwesome
            name="briefcase"
            size={20}
            color={darkMode ? 'white' : colors.textGray}
          />
          <FontAwesome
            name="plus-circle"
            size={15}
            color={colors.lightBlue}
            style={{ position: 'absolute', bottom: 0, right: 0 }}
          />
        </View>
        <Text style={{ maxWidth: 100 }}>Create an organization</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  briefcase: {
    borderWidth: 1,
    borderColor: colors.textGray,
    borderRadius: 50,
    padding: 10,
  },
});
