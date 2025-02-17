import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { Text, TextProps } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const GlobalFontContext = createContext<{ defaultFont: string }>({
  defaultFont: 'Barlow-Condensed',
});

export const useGlobalFont = () => {
  return useContext(GlobalFontContext);
};

export const GlobalFontProvider = ({ children }: { children: ReactNode }) => {
  const [fontsLoaded] = useFonts({
    'Roboto-Mono': require('../assets/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf'),
    'Barlow-Condensed': require('../assets/fonts/Barlow_Condensed/BarlowCondensed-Regular.ttf'),
  });

  useEffect(() => {
    const manageSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Esconde a SplashScreen após as fontes carregarem
      }
    };
    manageSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Não renderiza nada até que as fontes sejam carregadas
  }

  const DefaultText = (props: TextProps) => {
    const { style, ...restProps } = props;
    const fontFamilyStyle = [{ fontFamily: 'Barlow-Condensed' }, style];
    return <Text {...restProps} style={fontFamilyStyle} />;
  };

  return (
    <GlobalFontContext.Provider value={{ defaultFont: 'Barlow-Condensed' }}>
      {children}
    </GlobalFontContext.Provider>
  );
};
