import { EvilIcons } from '@expo/vector-icons';
import { Center, KeyboardAvoidingView, VStack } from '@gluestack-ui/themed';
import PhoneInput from 'react-native-phone-input';
import { Image } from 'expo-image';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View, Text, Platform, ScrollView } from 'react-native';
import { DatePickerInput, DatePickerModal } from 'react-native-paper-dates';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';

import { MyText } from '../Ui/MyText';
import { InputComponent } from '../InputComponent';

export const ProfileUpdateForm = (): JSX.Element => {
  const [imgUrl, setImgUrl] = useState('https://via.placeholder.com/48x48');
  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImgUrl(result.assets[0].uri);
    } else {
      console.log('User cancelled image picker');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Center>
        <View>
          <Image
            source={{ uri: imgUrl }}
            style={{ width: 58, height: 58, borderRadius: 9999, marginTop: 20 }}
          />

          <EvilIcons
            onPress={pickImageAsync}
            name="camera"
            size={14}
            color="black"
            style={styles.camera}
          />
        </View>
      </Center>
      <View style={{ marginTop: 50 }}>
        <MyText style={{ marginBottom: 10 }} poppins="Bold" fontSize={14}>
          User information
        </MyText>

        <VStack gap={10}>
          <>
            <InputComponent
              label="First Name"
              onChangeText={() => {}}
              placeholder="First Name"
              value=""
            />
          </>
          <>
            <InputComponent
              label="Last Name"
              onChangeText={() => {}}
              placeholder="Last Name"
              value=""
            />
          </>
          <>
            <InputComponent
              label="Email"
              onChangeText={() => {}}
              placeholder="Email"
              value=""
            />
          </>

          <>
            <MyText
              style={{
                marginBottom: 5,

                fontSize: 11,
              }}
              poppins="Medium"
            >
              Phone number
            </MyText>
            <PhoneInput
              initialCountry="ng"
              textProps={{
                placeholder: 'Enter a phone number...',
              }}
              style={styles.phone}
            />
          </>
          <>
            <MyText
              style={{
                marginBottom: 5,

                fontSize: 11,
              }}
              poppins="Medium"
            >
              Gender
            </MyText>
            <SelectList
              placeholder="Select your community"
              boxStyles={{
                ...styles.border,
              }}
              defaultOption={{
                key: 'male',
                value: 'Male',
              }}
              dropdownStyles={{ backgroundColor: 'white' }}
              dropdownTextStyles={{
                color: 'black',
                fontFamily: 'PoppinsLight',
              }}
              inputStyles={{
                textAlign: 'left',
                fontFamily: 'PoppinsMedium',
              }}
              setSelected={() => {}}
              data={[
                { key: 'male', value: 'Male' },
                { key: 'female', value: 'Female' },
              ]}
              save="key"
              search={false}
            />
          </>

          <>
            <DatePickerInput
              locale="en"
              label="Date of birth"
              value={inputDate}
              onChange={(d) => setInputDate(d)}
              inputMode="end"
              animationType="slide"
              presentationStyle="pageSheet"
              style={styles.container}
              contentStyle={styles.content}
              mode="flat"
              activeUnderlineColor="transparent"
              placeholderTextColor={'#000000'}
            />
          </>
        </VStack>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  camera: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    width: 20,
    height: 20,
    borderRadius: 9999,
    lineHeight: 20,
    textAlign: 'center',
    position: 'absolute',
    bottom: 2,
    right: -2,
  },

  phone: {
    width: '100%',
    backgroundColor: '#E9E9E9',
    height: 60,
    paddingHorizontal: 20,

    borderRadius: 2,
  },

  border: {
    borderRadius: 2,
    minHeight: 50,
    alignItems: 'center',

    height: 60,
    backgroundColor: '#E9E9E9',
    borderWidth: 0,
  },
  content: {
    paddingLeft: 10,

    width: 60,
    color: 'black',
    fontFamily: 'PoppinsMedium',
    fontSize: 12,
  },

  container: {
    backgroundColor: '#E9E9E9',
    color: 'black',
    fontFamily: 'PoppinsMedium',
    marginTop: 10,
  },
});
