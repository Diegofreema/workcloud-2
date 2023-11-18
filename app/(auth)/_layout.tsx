import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AuthHeader } from '../../components/AuthHeader';

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
      }}
    >
      <AuthHeader />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
