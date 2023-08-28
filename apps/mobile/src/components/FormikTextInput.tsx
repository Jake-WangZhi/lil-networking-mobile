import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import type { TextInputProps } from "react-native";
import { colors } from "@foundrymakes/tailwind-config";
import { Warning } from "phosphor-react-native";

export const FormikTextInput = (
  props: TextInputProps &
    Omit<FieldHookConfig<string>, "ref"> & {
      label?: string;
      required?: boolean;
    }
) => {
  const { label, required, name, onChangeText, onBlur, ...inputProps } = props;
  const [field, meta] = useField<string>(name);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="space-y-1">
      <View className="flex-row items-center space-x-2">
        {!!label && (
          <Text className="text-white text-base w-[74]">
            {label}
            {required ? " *" : ""}
          </Text>
        )}
        <TextInput
          className={`flex-1 bg-dark-grey text-white rounded ${
            label ? "p-2" : "p-4"
          } ${label ? "h-12" : "min-h-[64]"}  ${
            (isFocused || meta.error) && "border"
          } ${isFocused && "border-white"} ${meta.error && "border-error"}`}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={field.value}
          selectionColor={colors.white}
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
          autoCapitalize="none"
          {...inputProps}
        />
      </View>
      {meta.error && (
        <View className="flex-row items-center space-x-2">
          <Text className="w-[74]" />
          <View className="flex flex-row items-center space-x-1">
            <Warning color="#FB5913" size={16} weight="fill" />
            <Text className="text-error text-xs">{meta.error}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
