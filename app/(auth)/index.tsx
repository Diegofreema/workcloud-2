// import { View } from 'react-native';
// import React, { useState } from 'react';
// import { AuthTitle } from '../../components/AuthTitle';
// import { Button, Text } from 'react-native-paper';
// import Colors, { colors } from '../../constants/Colors';
// import { InputComponent } from '../../components/InputComponent';
// import { useFormik } from 'formik';
// import { useRouter } from 'expo-router';
// import * as yup from 'yup';
// type Props = {};
// const validationSchema = yup.object().shape({
//   email: yup.string().required('Email is required'),
//   password: yup.string().required('Password is required'),
// });
// const login = (props: Props) => {
//   const [toggle, setToggle] = useState(true);
//   const router = useRouter();
//   const {
//     values,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     isSubmitting,
//     errors,
//     touched,
//   } = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema,
//     onSubmit: (values) => {},
//   });

//   return (
//     <View style={{ flex: 1 }}>
//       <AuthTitle>Welcome, Login to continue</AuthTitle>
//       <Text style={{ marginTop: 20, color: colors.textGray }}>
//         Login to continue attending to customers
//       </Text>
//       <View style={{ marginTop: 20, flex: 1 }}>
//         <View style={{ flex: 0.6, gap: 10 }}>
//           <>
//             <InputComponent
//               value={values.email}
//               onChangeText={handleChange('email')}
//               placeholder="Email"
//               keyboardType="email-address"
//             />
//             {touched.email && errors.email && (
//               <Text style={{ color: 'red', fontWeight: 'bold' }}>
//                 {errors.email}
//               </Text>
//             )}
//           </>
//           <>
//             <InputComponent
//               value={values.password}
//               onChangeText={handleChange('password')}
//               placeholder="Password"
//               secureTextEntry
//               toggle={toggle}
//               setToggle={() => setToggle(!toggle)}
//             />
//             {touched.password && errors.password && (
//               <Text style={{ color: 'red', fontWeight: 'bold' }}>
//                 {errors.password}
//               </Text>
//             )}
//           </>
//           <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//             <Text
//               onPress={() => router.push('/forgot')}
//               style={{ color: colors.buttonBlue, fontWeight: 'bold' }}
//             >
//               Forgot password?
//             </Text>
//           </View>
//         </View>
//         <View style={{ flex: 0.4 }}>
//           <Button
//             mode="contained"
//             onPress={() => handleSubmit()}
//             buttonColor={colors.buttonBlue}
//           >
//             Login
//           </Button>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               marginTop: 10,
//             }}
//           >
//             <Text style={{ fontWeight: 'bold' }}>
//               Don't have an account?{' '}
//               <Text
//                 onPress={() => router.push('/signUp')}
//                 style={{ color: colors.buttonBlue, fontWeight: 'bold' }}
//               >
//                 Sign up
//               </Text>
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default login;

import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/Colors';
import { AuthTitle } from '../../components/AuthTitle';
import { View } from 'react-native';
WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  const { userId } = useAuth();
  const { user } = useUser();

  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push('/(tabs)/');
      } else {
        // Use signIn or signUp for next steps such as MFA
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
      <Text onPress={() => router.push('/(tabs)/')}>Back</Text>
    </View>
  );
};
export default SignInWithOAuth;
