import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import dateFormat from 'dateformat';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FileObject } from '@supabase/storage-js';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-paper';
import { useFormik } from 'formik';
import { useAuth } from '@clerk/clerk-expo';
import Toast from 'react-native-toast-message';
import DocumentPicker, {
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import { days, defaultStyle } from '../constants';
import { AuthHeader } from '../components/AuthHeader';
import { AuthTitle } from '../components/AuthTitle';
import { useDarkMode } from '../hooks/useDarkMode';
import { colors } from '../constants/Colors';
import { Subtitle } from '../components/Subtitle';
import { InputComponent } from '../components/InputComponent';
import { supabase } from '../lib/supabase';
import ImageItem from '../components/ImageItem';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
const validationSchema = yup.object().shape({
  organization_name: yup.string().required('Name of organization is required'),
  category: yup.string().required('Category is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
  startDay: yup.string().required('Working days are required'),
  endDay: yup.string().required('Working days are required'),

  website_url: yup.string().required('Website link is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

type Props = {};

const CreateWorkSpace = (props: Props) => {
  const [startTime, setStartTime] = useState(new Date(1598051730000));
  const [endTime, setEndTime] = useState(new Date(1598051730000));
  const [imagePath, setImagePath] = useState('');
  const [imageName, setImageName] = useState<ArrayBuffer>();
  const [imageType, setImageType] = useState('');
  const [image, setImage] = useState<string>('');
  const { isLoaded, userId } = useAuth();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [file, setFile] = useState<FileObject[]>([]);
  useEffect(() => {
    loadImage(imagePath);
  }, [imagePath, imageName, imageType]);
  const loadImage = async (filePath: any) => {
    const { data } = supabase.storage
      .from('organizations')
      .getPublicUrl(`${imagePath}/${imageName}.${imageType}`);
    const finalImageUrl = data.publicUrl.split('/').slice(0, -1).join('/');

    setImage(finalImageUrl);
  };
  console.log(image);

  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      const img = result.assets[0];
      console.log(img);

      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: 'base64',
      });
      const filePath = `${Math.random()}/${new Date().getTime()}.${
        img.type === 'image' ? 'png' : 'mp4'
      }`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';

      const { error } = await supabase.storage
        .from('organizations')
        .upload(filePath, decode(base64), { contentType });
      setImagePath(filePath);
      setImageName(decode(base64));
      setImageType(contentType);
      loadImage(filePath);
      if (error) {
        console.log(error);
      }
    }
  };
  console.log(image.split('/').slice(0, -1).join('/'));

  const onRemove = async () => {
    const { data, error } = await supabase.storage
      .from('organizations')
      .remove([`${imagePath}/${imageName}.${imageType}`]);
    setImage('');
  };
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',
      organization_name: '',
      category: '',
      startDay: '',
      endDay: '',
      description: '',
      location: '',
      website_url: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // if (isLoaded && !userId)
      //   return Toast.show({
      //     type: 'error',
      //     text1: 'Unauthorized',
      //     text2: 'Please login to continue',
      //   });
      const {
        email,
        category,
        endDay,
        location,
        organization_name,
        startDay,

        website_url,
      } = values;

      const { error } = await supabase.from('workspace').insert({
        organization_name: organization_name,
        category,
        description,
        email,
        closing_time: endTime,
        work_days: `${startDay} - ${endDay}`,
        website: website_url,
        location,
        opening_time: startTime,
        owner_id: 'userId',
        image_url: image,
      });

      if (!error) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Organization created successfully',
        });
        resetForm();
        router.push('/workspace');
      }
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      }
      console.log(error);
    },
  });
  console.log(errors);

  const onChange = (event: any, selectedDate: any, type: string) => {
    const currentDate = selectedDate;
    if (type === 'startTime') {
      setShow(false);
      setStartTime(currentDate);
    } else {
      setShow2(false);
      setEndTime(currentDate);
    }
  };
  const showMode = () => {
    setShow(true);
  };
  const showMode2 = () => {
    setShow2(true);
  };
  const {
    email,
    category,
    endDay,
    location,
    organization_name,
    startDay,
    description,
    website_url,
  } = values;
  return (
    <ScrollView
      style={[defaultStyle, { flex: 1 }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <AuthHeader />
      <AuthTitle>Create an organization</AuthTitle>
      <Subtitle>Enter your organization details</Subtitle>
      <View style={{ marginTop: 20, flex: 1 }}>
        <View style={{ flex: 0.6, gap: 10 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {image.includes('png') || image.includes('jpg') ? (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              >
                <Image
                  contentFit="cover"
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={image}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 3,
                    backgroundColor: darkMode ? 'white' : 'black',
                    padding: 5,
                    borderRadius: 30,
                  }}
                  onPress={onRemove}
                >
                  <Ionicons name="trash-outline" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,

                  backgroundColor: 'gray',
                }}
              >
                {/* <Image /> */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 3,
                    backgroundColor: darkMode ? 'white' : 'black',
                    padding: 5,
                    borderRadius: 30,
                  }}
                  onPress={onSelectImage}
                >
                  <FontAwesome
                    name="plus"
                    size={20}
                    color={darkMode ? 'black' : 'white'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <>
            <InputComponent
              label="Organization Name"
              value={organization_name}
              onChangeText={handleChange('organization_name')}
              placeholder="Organization Name"
              keyboardType="default"
            />
            {touched.organization_name && errors.organization_name && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.organization_name}
              </Text>
            )}
          </>
          <>
            <InputComponent
              label="Description"
              value={description}
              onChangeText={handleChange('description')}
              placeholder="Description"
              keyboardType="default"
            />
            {touched.description && errors.description && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.description}
              </Text>
            )}
          </>
          <>
            <InputComponent
              label="Category"
              value={category}
              onChangeText={handleChange('category')}
              placeholder="Category"
              keyboardType="default"
            />
            {touched.category && errors.category && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.category}
              </Text>
            )}
          </>
          <>
            <InputComponent
              label="Location"
              value={location}
              onChangeText={handleChange('location')}
              placeholder="Location"
              keyboardType="default"
            />
            {touched.location && errors.location && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.location}
              </Text>
            )}
          </>
          <>
            <InputComponent
              label="Website Link"
              value={website_url}
              onChangeText={handleChange('website_url')}
              placeholder="Website link"
              keyboardType="default"
            />
            {touched.website_url && errors.website_url && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.website_url}
              </Text>
            )}
          </>
          <>
            <InputComponent
              label="Email"
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
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
              Work Days
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <>
                <View style={styles2.border}>
                  <RNPickerSelect
                    value={startDay}
                    onValueChange={handleChange('startDay')}
                    items={days}
                    style={styles}
                  />
                </View>
                {touched.startDay && errors.startDay && (
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    {errors.startDay}
                  </Text>
                )}
              </>
              <>
                <View style={styles2.border}>
                  <RNPickerSelect
                    value={endDay}
                    onValueChange={handleChange('endDay')}
                    items={days}
                    style={styles}
                  />
                </View>
                {touched.endDay && errors.endDay && (
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    {errors.endDay}
                  </Text>
                )}
              </>
            </View>
          </>
          <>
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
              Opening And Closing Time
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <>
                <Pressable onPress={showMode} style={styles2.border}>
                  <Text>
                    {' '}
                    {`${
                      dateFormat(startTime, 'HH:MM') || ' Date Of Birth'
                    }`}{' '}
                  </Text>
                </Pressable>
                {/* {touched.date && errors.date && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.date}
              </Text>
            )} */}

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startTime}
                    mode={'time'}
                    is24Hour={true}
                    onChange={(event, selectedDate) =>
                      onChange(event, selectedDate, 'startTime')
                    }
                  />
                )}
              </>
              <>
                <Pressable onPress={showMode2} style={styles2.border}>
                  <Text>
                    {' '}
                    {`${dateFormat(endTime, 'HH:MM') || ' Date Of Birth'}`}{' '}
                  </Text>
                </Pressable>
                {/* {touched.date && errors.date && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.date}
              </Text>
            )} */}
                {show2 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endTime}
                    mode={'time'}
                    is24Hour={true}
                    onChange={(event, selectedDate) =>
                      onChange(event, selectedDate, 'endTime')
                    }
                  />
                )}
              </>
            </View>
          </>
        </View>
        <View style={{ flex: 0.4, marginTop: 30 }}>
          <Button
            loading={isSubmitting}
            mode="contained"
            onPress={() => handleSubmit()}
            buttonColor={colors.buttonBlue}
          >
            {isSubmitting ? 'Creating Organization' : 'Create Organization'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateWorkSpace;

const styles2 = StyleSheet.create({
  border: {
    backgroundColor: '#E9E9E9',
    minHeight: 52,
    paddingLeft: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    width: '50%',
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
