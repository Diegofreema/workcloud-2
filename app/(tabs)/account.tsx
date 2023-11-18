import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import { defaultStyle } from '../../constants';
import { useAuth } from '@clerk/clerk-expo';
import { colors } from '../../constants/Colors';

type Props = {};

const account = (props: Props) => {
  const router = useRouter();
  const { signOut } = useAuth();
  return (
    <View
      style={{ ...defaultStyle, paddingTop: 50, flexDirection: 'row', gap: 10 }}
    >
      <Button
        buttonColor={colors.buttonBlue}
        onPress={() => router.push('/login')}
        mode="contained-tonal"
      >
        Sign in
      </Button>
      <Button onPress={() => signOut()} mode="contained-tonal">
        Sign out
      </Button>
    </View>
  );
};

export default account;

const styles = StyleSheet.create({});
