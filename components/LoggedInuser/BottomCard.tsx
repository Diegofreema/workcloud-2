import { StyleSheet, ScrollView } from 'react-native';
import { HStack, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';

import { HeadingText } from '../Ui/HeadingText';
import { useLocalSearchParams } from 'expo-router';
import { MyText } from '../Ui/MyText';
import { colors } from '../../constants/Colors';

type Props = {};
const call = {
  time: '20 min ago',
  from: 'Called on fidelity WS',
  name: 'Roland Gracias',
};

const fourItems = [1, 2, 3];
export const BottomCard = ({}: Props): JSX.Element => {
  const { records } = useLocalSearchParams();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeadingText
        leftText="Call Records"
        rightText="See all call records"
        link={`/calls/${records}`}
      />

      <HStack
        alignItems="center"
        justifyContent="space-between"
        style={{ flexWrap: 'wrap', marginTop: 10 }}
      >
        {fourItems.map((item, index) => (
          <VStack key={index} justifyContent="center" alignItems="center">
            <Image
              source={require('../../assets/images/video.png')}
              style={styles.image}
            />
            <MyText poppins="Bold">{call.name}</MyText>
            <MyText fontSize={7} poppins="Medium">
              {call.from}
            </MyText>
            <MyText style={{ color: colors.nine }} poppins="Light">
              {call.time}
            </MyText>
          </VStack>
        ))}
      </HStack>

      <VStack mt={20}>
        <HStack space="sm">
          <Image
            source={require('../../assets/images/settings.png')}
            style={{ width: 18, height: 18 }}
          />
          <VStack>
            <MyText poppins="Medium" fontSize={12}>
              Settings
            </MyText>
            <MyText poppins="Light" fontSize={9}>
              Change password, Email address
            </MyText>
          </VStack>
        </HStack>
        <HStack space="sm" mt={20}>
          <Image
            source={require('../../assets/images/exit.png')}
            style={{ width: 18, height: 18 }}
          />
          <MyText poppins="Medium" fontSize={10}>
            Logout
          </MyText>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
});
