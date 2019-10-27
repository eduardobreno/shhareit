import React from "react";
import { KeyboardTypeOptions, View } from "react-native";
import {
  Text,
  Label,
  Item,
  Input as InputNB,
  Button as ButtonNB,
  Spinner,
  NativeBase,
  Textarea as TextareaNB,
  Icon
} from "native-base";

import Theme from "app/resources/themes";

interface InputProps extends NativeBase.Input {
  label: string;
  value: string;
  hasError?: boolean;
  errorMsg?: string;
  textarea?: boolean;
}

export const Input = (props: InputProps) => {
  const { label, value, hasError, errorMsg, textarea } = props;
  return (
    <Item stackedLabel error={hasError}>
      <Label>{label}</Label>
      <InputNB value={value} {...props} />
      {hasError && <Text style={Theme.stl.TXT_ERROR}>{errorMsg}</Text>}
    </Item>
  );
};

interface TextAreaProps extends NativeBase.Textarea {
  label: string;
  value: string;
  hasError?: boolean;
  errorMsg?: string;
  textarea?: boolean;
}

export const Textarea = (props: TextAreaProps) => {
  const { label, value, hasError, errorMsg } = props;
  return (
    <Item stackedLabel error={hasError}>
      <Label>{label}</Label>
      <TextareaNB {...props} style={{ width: "100%" }} value={value} />

      {hasError && <Text style={Theme.stl.TXT_ERROR}>{errorMsg}</Text>}
    </Item>
  );
};

interface ButtonProps extends NativeBase.Button {
  label: string;
  onPress: () => void;
  icon?: string;
  showSpinner?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { onPress, bordered, transparent, showSpinner, label, icon } = props;
  return (
    <ButtonNB
      bordered={bordered}
      full
      transparent={transparent}
      onPress={() => {
        !showSpinner && onPress();
      }}
      style={Theme.stl.BTN_PADDING}>
      {showSpinner && <Spinner />}
      {!showSpinner && <Text style={Theme.stl.BTN_TXT_NORMAL}>{label}</Text>}
      {icon && <Icon name={icon} />}
    </ButtonNB>
  );
};

interface LabelDividerProps {
  children: string;
}
export const LabelDivider = ({ children }: LabelDividerProps) => {
  return (
    <View style={[Theme.stl.TXT_DIVIDER]}>
      <Text style={[Theme.stl.TXT_NORMAL]}>{children}</Text>
    </View>
  );
};
