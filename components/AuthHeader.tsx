import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useDarkMode } from '../hooks/useDarkMode';

type Props = {};

export const AuthHeader = (props: Props) => {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const pathname = usePathname();

  const navigator = () => {
    if (pathname === '/board') {
      router.push('/(tabs)/');
    } else {
      router.back();
    }
  };

  return (
    <Pressable onPress={navigator} style={{ marginBottom: 14 }}>
      <FontAwesome
        name="angle-left"
        size={35}
        color={darkMode ? 'white' : 'black'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
