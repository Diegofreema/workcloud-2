import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';

  setToggle?: () => void;
  password?: boolean;
  id?: string;
};

export const InputComponent = ({
  onChangeText,
  placeholder,
  value,
  keyboardType,
  secureTextEntry,
  setToggle,
  id,
  password,
}: Props): JSX.Element => {
  const handleToggle = (inputId: string) => {
    if (id === inputId) {
      setToggle && setToggle();
    }
  };
  return (
    <TextInput
      right={
        password && (
          <TextInput.Icon
            id={id}
            icon={secureTextEntry ? 'eye' : 'eye-off'}
            onPress={() => handleToggle(id as string)}
          />
        )
      }
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({});
