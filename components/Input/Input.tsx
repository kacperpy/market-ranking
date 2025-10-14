import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { inputStyles } from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
}

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        style={[inputStyles.input, isFocused && inputStyles.inputFocused]}
        placeholderTextColor="#bebebeff"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(val) => onChangeText(val)}
        placeholder={placeholder}
      />
    </View>
  );
};
