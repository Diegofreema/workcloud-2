import { StyleSheet, View, Text } from 'react-native';
import { OrganizationItems } from '../../app/(organization)/[organizationId]';
import { useDarkMode } from '../../hooks/useDarkMode';
import { colors } from '../../constants/Colors';

type Props = {};
const organization = {
  location: 'Lagos Nigeria',
  website: 'https://google.com',
  email: '5EYg0@example.com',
};
export const OrganizationDetails = ({}: Props): JSX.Element => {
  return (
    <View>
      <Text>jk</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
