import { HStack } from '@gluestack-ui/themed';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { HeadingText } from '../Ui/HeadingText';

type Props = {};

const fourItems = [1, 2, 3, 4];
export const MiddleCard = ({}: Props): JSX.Element => {
  return (
    <View>
      <HeadingText link="/connections" />

      <HStack justifyContent="space-between" mt="$2">
        {fourItems.map((item, index) => (
          <Image
            key={index}
            source={{ uri: 'https://via.placeholder.com/48x48' }}
            style={{ width: 58, height: 58, borderRadius: 9999 }}
          />
        ))}
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({});
