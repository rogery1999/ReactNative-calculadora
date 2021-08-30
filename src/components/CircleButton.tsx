import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ICircleButtonProps {
  type: 'special' | 'operator' | 'number';
  text: string;
  height: number;
  width: number;
  expansive?: boolean;
  onPress: () => void;
}

const CircleButton = ({
  type,
  text,
  height,
  width,
  onPress,
}: ICircleButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.button, styles[type ?? 'number'], { height, width }]}>
        <Text
          style={[
            styles.text,
            type === 'special' ? styles.specialText : styles.otherText,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 100,
  },
  special: {
    backgroundColor: '#A5A5A5',
  },
  operator: {
    backgroundColor: '#FEA017',
  },
  number: {
    backgroundColor: '#323332',
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    padding: 10,
    fontWeight: '900',
  },
  specialText: {
    color: 'black',
  },
  otherText: {
    color: 'white',
  },
});
