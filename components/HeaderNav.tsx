import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useDarkMode } from '../hooks/useDarkMode';
import { Pressable } from 'react-native';

type Props = {
  title: string;
  RightComponent?: () => JSX.Element;
};

export const HeaderNav = ({ title, RightComponent }: Props): JSX.Element => {
  const router = useRouter();
  const { darkMode } = useDarkMode();

  const onGoBack = () => {
    router.back();
  };
  return (
    <View
      style={{
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable
          onPress={onGoBack}
          style={{
            paddingVertical: 5,
            paddingRight: 5,
          }}
        >
          <FontAwesome
            name="angle-left"
            color={darkMode ? 'white' : 'black'}
            size={30}
          />
        </Pressable>
        <Text
          style={{
            color: darkMode ? 'white' : 'black',
            fontFamily: 'PoppinsBold',

            fontSize: 15,
          }}
        >
          {title}
        </Text>
      </View>

      {RightComponent && <RightComponent />}
    </View>
  );
};

const styles = StyleSheet.create({});