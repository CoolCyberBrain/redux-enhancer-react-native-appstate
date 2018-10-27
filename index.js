import { AppState } from 'react-native';

export const ACTIVE = 'APP_STATE.ACTIVE';
export const BACKGROUND = 'APP_STATE.BACKGROUND';
export const INACTIVE = 'APP_STATE.INACTIVE';

export default () => (createStore) => (...args) => {
  const store = createStore(...args);

  let currentState = '';

  const handleAppStateChange = (nextAppState) => {
    if (currentState !== nextAppState) {
      let type;
      if (nextAppState === 'active') {
        type = ACTIVE;
      } else if (nextAppState === 'background') {
        type = BACKGROUND;
      } else if (nextAppState === 'inactive') {
        type = INACTIVE;
      }
      if (type) {
        store.dispatch({
          type,
        });
      }
    }
    currentState = nextAppState;
  };

  AppState.addEventListener('change', handleAppStateChange);
  
  handleAppStateChange(AppState.currentState);
  return store;
};
