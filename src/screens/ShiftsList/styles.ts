import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'tomato',
    textAlign: 'center',
    fontSize: 15,
  },
  retryText: {
    color: '#3b82f6',
    fontSize: 15,
    marginTop: 10,
  },
  shiftsList: {
    padding: 10,
  },
  shiftCard: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginBottom: 10,
  },
  defaultText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  workInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  workType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  payContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  payText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
});
