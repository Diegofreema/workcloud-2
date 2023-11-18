import { EvilIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../constants/Colors';

type Props = {};

export const Header = ({}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          color: colors.buttonBlue,
          fontSize: 20,
          fontStyle: 'italic',
        }}
      >
        Workcloud
      </Text>
      <View style={styles.subContainer}>
        <EvilIcons name="search" size={28} color={'#000'} />

        <EvilIcons name="bell" size={28} color={'#000'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});
