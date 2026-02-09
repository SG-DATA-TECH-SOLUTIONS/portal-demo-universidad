/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#4f3122',            // texto sobre fondo claro (usamos marrón principal)
    background: '#EADBC0',      // crema claro
    tint: '#C7A26A',            // acento madera
    icon: '#8A9A5B',            // verde oliva (activo)
    tabIconDefault: '#B6A792',  // gris cálido
    tabIconSelected: '#C7A26A', // acento madera
    card: '#ffffff',            // fondo de tarjetas o secciones
    success: '#8A9A5B',         // verde oliva
    error: '#a12b2b',           // rojo vino claro
  },
  dark: {
    text: '#EADBC0',            // crema claro
    background: '#4f3122',      // marrón medio (fondo principal)
    tint: '#C7A26A',            // acento madera
    icon: '#C7A26A',            // iconos en dorado cálido
    tabIconDefault: '#B6A792',  // gris cálido
    tabIconSelected: '#C7A26A', // dorado madera
    card: '#6f4c34',            // marrón secundario
    success: '#8A9A5B',         // verde oliva
    error: '#a12b2b',           // rojo vino claro
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
