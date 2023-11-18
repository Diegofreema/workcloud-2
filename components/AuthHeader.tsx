import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

type Props = {};

export const AuthHeader = (props: Props) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} style={{ marginBottom: 14 }}>
      <FontAwesome name="angle-left" size={35} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
