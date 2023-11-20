import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import React, { ChangeEvent, useState } from 'react';
import { AuthTitle } from '../components/AuthTitle';
import { Button, Text, TextInput } from 'react-native-paper';
import Colors, { colors } from '../constants/Colors';
import { InputComponent } from '../components/InputComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import { supabase } from '../lib/supabase';
import * as yup from 'yup';
import dateFormat from 'dateformat';
type Props = {};
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
});
const signup = (props: Props) => {
  const [secured, setShowPassword] = useState(true);
  const [secured2, setShowPassword2] = useState(true);

  const [date, setDate] = useState(new Date(1598051730000));

  const [show, setShow] = useState(false);
  const router = useRouter();
  // const onChange = (event: ChangeEvent<any>, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setShow(false);
  //   setDate(currentDate);
  // };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = () => {
    setShow(true);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',

      gender: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, firstName, gender, lastName, password } = values;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            gender,
            date_of_birth: date,
          },
        },
      });
      console.log(values);

      if (error) {
        console.log(error);
      }
    },
  });
  console.log(errors);

  const { email, firstName, gender, lastName, password, confirmPassword } =
    values;
  console.log(date);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <AuthTitle>Create an account</AuthTitle>
      <Text style={{ marginTop: 20, color: colors.textGray }}>
        Enter a valid email address either company email or personal email to
        create an account
      </Text>
      <View style={{ marginTop: 20, flex: 1 }}>
        <View style={{ flex: 0.6, gap: 10 }}>
          <>
            <InputComponent
              value={email}
              onChangeText={handleChange('email')}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.email}
              </Text>
            )}
          </>
          <>
            <InputComponent
              value={firstName}
              onChangeText={handleChange('firstName')}
              placeholder="First Name"
              keyboardType="default"
            />
            {touched.firstName && errors.firstName && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.firstName}
              </Text>
            )}
          </>
          <>
            <InputComponent
              value={lastName}
              onChangeText={handleChange('lastName')}
              placeholder="Last Name"
              keyboardType="default"
            />
            {touched.lastName && errors.lastName && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.lastName}
              </Text>
            )}
          </>
          <>
            <Pressable onPress={showMode} style={styles2.border}>
              <Text>
                {' '}
                {`${dateFormat(date, 'dd/mm/yyyy') || ' Date Of Birth'}`}{' '}
              </Text>
            </Pressable>
            {/* {touched.date && errors.date && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.date}
              </Text>
            )} */}
          </>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <>
            <View style={styles2.border}>
              <RNPickerSelect
                value={gender}
                onValueChange={handleChange('gender')}
                items={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
                style={styles}
              />
            </View>
            {touched.gender && errors.gender && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.gender}
              </Text>
            )}
          </>
          <>
            <TextInput
              right={
                <TextInput.Icon
                  icon={secured ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!secured)}
                />
              }
              placeholder={'Password'}
              value={password}
              onChangeText={handleChange('password')}
              secureTextEntry={secured}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.password}
              </Text>
            )}
          </>
          <>
            <TextInput
              right={
                <TextInput.Icon
                  icon={secured2 ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword2(!secured2)}
                />
              }
              placeholder={'Confirm Password'}
              value={confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry={secured2}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.confirmPassword}
              </Text>
            )}
          </>
        </View>
        <View style={{ flex: 0.4, marginTop: 30 }}>
          <Button
            loading={isSubmitting}
            mode="contained"
            onPress={() => handleSubmit()}
            buttonColor={colors.buttonBlue}
          >
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default signup;

const styles2 = StyleSheet.create({
  border: {
    backgroundColor: '#eee',
    minHeight: 52,
    paddingLeft: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.textGray,
  },
});
const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
