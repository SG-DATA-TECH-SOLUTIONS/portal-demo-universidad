import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import App from './App';

export default function Main() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { 
        ...MD3DarkTheme, 
        colors: { 
          ...theme.dark,
          brandPrimary: '#ff0000ff',
          brandSecondary: 'red',
        }
      }
      : {
        ...MD3LightTheme,
        colors: { 
          ...theme.light,
          brandPrimary: '#ff0000ff',
          brandSecondary: 'red',
        }
      };

  return (
    <PaperProvider theme={paperTheme}>
      <App />
    </PaperProvider>
  );
}