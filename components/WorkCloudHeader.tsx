import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { defaultStyle } from '../constants';
import { useDarkMode } from '../hooks/useDarkMode';
import { useRouter } from 'expo-router';

type Props = {};

export const WorkCloudHeader = ({}: Props): JSX.Element => {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  return (
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
        Workspace
      </Text>
      <Pressable
        onPress={() => router.push('/create-workspace')}
        style={({ pressed }) => pressed && { opacity: 0.5 }}
      >
        <FontAwesome name="plus-circle" size={30} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
