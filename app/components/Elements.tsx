import React from "react";
import { KeyboardTypeOptions } from "react-native";
import {
  Text,
  Label,
  Item,
  Input as InputNB,
  Button as ButtonNB,
  Spinner
} from "native-base";

import Theme from "app/resources/themes";

interface InputProps {
  label: string;
  value: string;
  hasError?: boolean;
  errorMsg?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const Input = (props: InputProps) => {
  const { label, value, hasError, errorMsg } = props;
  return (
    <Item stackedLabel error={hasError}>
      <Label>{label}</Label>
      <InputNB value={value} {...props} />
      {hasError && <Text style={Theme.stl.TXT_ERROR}>{errorMsg}</Text>}
    </Item>
  );
};

interface ButtonProps {
  label: string;
  showSpinner?: boolean;
  onPress: () => void;
  bordered?: boolean;
  transparent?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { onPress, bordered, transparent, showSpinner, label } = props;
  return (
    <ButtonNB
      bordered={bordered}
      full
      transparent={transparent}
      onPress={onPress}
      style={Theme.stl.BTN_PADDING}>
      {showSpinner && <Spinner />}
      {!showSpinner && <Text style={Theme.stl.BTN_TXT_NORMAL}>{label}</Text>}
    </ButtonNB>
  );
};
