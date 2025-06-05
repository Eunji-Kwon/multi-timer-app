// styles/AppStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mainRow: { flex: 1, flexDirection: 'row' },

  timerArea: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  headerButtons: { flexDirection: 'row', gap: 10 },

  globalStartButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20
  },
  globalStartButtonRunning: { backgroundColor: '#34C759' },
  globalStartButtonPaused: { backgroundColor: '#FF9500' },
  globalStartButtonText: { color: '#fff', fontWeight: 'bold' },

  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20
  },
  addButtonDisabled: { backgroundColor: '#ccc' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff'
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0'
  },
  tabButtonActive: {
    backgroundColor: '#FF9500'
  },
  tabButtonText: {
    fontWeight: 'bold',
    color: '#333'
  },
});
