import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;
const timerWidth = isLandscape ? width * 0.4 : width * 0.8; // 가로모드: 40%, 세로모드: 80%

export const timerStyles = StyleSheet.create({
  container: {
    width: timerWidth,
    borderRadius: 15,
    padding: 20,
    margin: 10,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInput: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 80,
    height: 80,
  },
  timeSeparator: {
    fontSize: 48,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 15,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonRunning: {
    backgroundColor: '#007AFF',
  },
  buttonReset: {
    backgroundColor: '#34C759',
  },
  buttonPaused: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 