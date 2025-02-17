import React, { createContext, useContext, ReactNode } from 'react';

// Definição do tema com todas as cores
export const Theme01 = {
  COLORS: {
    // Cores principais
    PRIMARY: '#030303', // Quase Preto
    SECONDARY: '#FEFEFE', // Quase Branco
    WHITE_BACKGROUND: '#ededed', // Fundo Branco Claro

    // Cores de destaque
    RED: '#E63946', // Vermelho Vibrante
    GREEN: '#2A9D8F', // Verde-Água Fresco
    YELLOW: '#F4D35E', // Amarelo Suave
    GREEN_PEN:'#CCFF44',

    // Cores complementares e neutras
    RED_LIGHT: '#FFCDD2', // Vermelho Claro
    GREEN_DARK: '#1B5E20', // Verde Escuro
    YELLOW_DARK: '#CDA434', // Amarelo Escuro
    GRAY_LIGHT: '#B0B0B0', // Cinza Claro
    GRAY_MEDIUM: '#707070', // Cinza Médio
    GRAY_DARK: '#333333', // Cinza Escuro
    LIGHT_GREEN: '#A8DADC',
    BLUE_SOFT: '#4A90E2', // Azul Suave
    PURPLE_LIGHT: '#9B59B6', // Roxo Claro

    // Cores de texto
    TEXT_PRIMARY: '#111111', // Cor de Texto Principal (Preto Suave)
    TEXT_SECONDARY: '#555555', // Cor de Texto Secundário (Cinza Médio)
    TEXT_LIGHT: '#FAFAFA', // Texto em Fundos Escuros (Quase Branco)
    TEXT_DISABLED: '#9E9E9E', // Cor de Texto Desabilitado (Cinza Claro)

    // Cores de botão
    BUTTON_PRIMARY: '#4A90E2', // Cor Principal do Botão (Azul)
    BUTTON_SECONDARY: '#9B59B6', // Cor Secundária do Botão (Roxo Claro)
    BUTTON_DISABLED: '#D3D3D3', // Cor de Botão Desabilitado (Cinza Claro)

    // Cores de ícones e cartões
    ICON_COLOR: '#333333', // Cor de ícones (Cinza Escuro)
    CARD_BACKGROUND: '#fbfbfb', // Cor de fundo dos cartões
    SHADOW_COLOR: '#000', // Sombra dos cartões
    SEPARATOR: '#ccc', // Cor do separador
  },
};

// Criação do contexto
const ThemeContext = createContext(Theme01);

// Provedor de Tema
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeContext.Provider value={Theme01}>{children}</ThemeContext.Provider>;
};

// Hook para acessar o tema
export const useTheme = () => useContext(ThemeContext);
