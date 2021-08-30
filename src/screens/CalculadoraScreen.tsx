import React, { useEffect } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CircleButton from '../components/CircleButton';
import useCalculadora from '../hooks/useCalculadora';
import { layoutConstants, styles } from '../theme/AppTheme';

const findButtonWidth = (
  windowWidth: number,
  buttonsInARow: number
): number => {
  const intWindowWidth = parseInt(windowWidth.toFixed(0), 10);
  const buttonSpaceAviable =
    intWindowWidth -
    layoutConstants.mainContinerPadding * 2 -
    layoutConstants.spaceBetweenButtons * (buttonsInARow - 1);
  const normalButton = buttonSpaceAviable / 4;
  return parseInt(normalButton.toFixed(0), 10);
};

const specialButtonWidth = (
  windowWidth: number,
  normalButtonWidth: number,
  inlineButtons: number
): number => {
  const intWindowWidth = parseInt(windowWidth.toFixed(0), 10);
  const buttonSpaceAviable =
    intWindowWidth -
    layoutConstants.mainContinerPadding * 2 -
    layoutConstants.spaceBetweenButtons * (inlineButtons - 1);
  const buttonWidth =
    buttonSpaceAviable - normalButtonWidth * (inlineButtons - 1);
  return parseInt(buttonWidth.toFixed(0), 10);
};

const CalculadoraScreen = () => {
  const { width } = useWindowDimensions();
  const buttonWidth = findButtonWidth(width, 4);
  const doubeButtonWidth = specialButtonWidth(width, buttonWidth, 3);
  const {
    result,
    baseNumber,
    clear,
    absoluteValue,
    deleteLastDigit,
    dot,
    makeOperation,
    modifyBaseNumber,
  } = useCalculadora();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={styles.smallResult}>{result}</Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {baseNumber}
      </Text>
      <View style={styles.rowButtons}>
        <CircleButton
          text='C'
          type={'special'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={clear}
        />
        <CircleButton
          text='±'
          type={'special'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={absoluteValue}
        />
        <CircleButton
          text='⌂'
          type={'special'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={deleteLastDigit}
        />
        <CircleButton
          text='÷'
          type={'operator'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => makeOperation('÷')}
        />
      </View>
      <View style={styles.rowButtons}>
        <CircleButton
          text='7'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('7')}
        />
        <CircleButton
          text='8'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('8')}
        />
        <CircleButton
          text='9'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('9')}
        />
        <CircleButton
          text='x'
          type={'operator'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => makeOperation('x')}
        />
      </View>
      <View style={styles.rowButtons}>
        <CircleButton
          text='4'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('4')}
        />
        <CircleButton
          text='5'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('5')}
        />
        <CircleButton
          text='6'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('6')}
        />
        <CircleButton
          text='-'
          type={'operator'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => makeOperation('-')}
        />
      </View>
      <View style={styles.rowButtons}>
        <CircleButton
          text='1'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('1')}
        />
        <CircleButton
          text='2'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('2')}
        />
        <CircleButton
          text='3'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('3')}
        />
        <CircleButton
          text='+'
          type={'operator'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => makeOperation('+')}
        />
      </View>
      <View style={styles.rowButtons}>
        <CircleButton
          text='0'
          type={'number'}
          width={doubeButtonWidth}
          height={buttonWidth}
          onPress={() => modifyBaseNumber('0')}
        />
        <CircleButton
          text='.'
          type={'number'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={dot}
        />
        <CircleButton
          text='='
          type={'operator'}
          width={buttonWidth}
          height={buttonWidth}
          onPress={() => makeOperation('=')}
        />
      </View>
    </View>
  );
};

export default CalculadoraScreen;
