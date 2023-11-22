import { StyleSheet, View } from 'react-native';

import { useDarkMode } from '../hooks/useDarkMode';
import { colors } from '../constants/Colors';
import { Text } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};

export const Subtitle = ({ children }: Props): JSX.Element => {
  const { darkMode } = useDarkMode();
  return (
    <Text
      style={{ color: darkMode ? 'white' : colors.textGray, marginTop: 10 }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});
