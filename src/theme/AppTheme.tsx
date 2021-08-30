import { StyleSheet } from 'react-native';

export const layoutConstants = {
  mainContinerPadding: 15,
  spaceBetweenButtons: 15,
};

export const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: 'black',
  },
  calculadoraContainer: {
    paddingHorizontal: layoutConstants.mainContinerPadding,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  result: {
    color: 'white',
    fontSize: 60,
    textAlign: 'right',
    marginBottom: 10,
  },
  smallResult: {
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'right',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default styles;
