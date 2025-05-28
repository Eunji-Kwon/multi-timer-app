// styles/TimerListStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;

export const timerListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  scrollContentLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 20,
    gap: 20,
  },
  timerWrapper: {
    width: '90%',
    marginBottom: 20,
  },
  timerWrapperLandscape: {
    width: '45%',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
