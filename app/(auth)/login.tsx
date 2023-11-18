import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/Colors';
import { AuthTitle } from '../../components/AuthTitle';
import { View } from 'react-native';
WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push('/(tabs)/');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <AuthTitle>Welcome, Login to continue</AuthTitle>
      <Text style={{ marginTop: 20, color: colors.textGray }}>
        Login to continue attending to customers
      </Text>
      <View style={{ marginTop: 30 }}>
        <Button
          mode="contained"
          onPress={onPress}
          buttonColor={colors.buttonBlue}
          textColor="white"
          contentStyle={{
            height: 50,
            borderRadius: 10,
            flexDirection: 'row-reverse',
          }}
          icon={'google'}
          uppercase
          rippleColor={'#000'}
        >
          Sign in with
        </Button>
      </View>
    </View>
  );
};
export default SignInWithOAuth;
