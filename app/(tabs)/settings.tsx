import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/themeContext'; // Hook para o tema

export default function Settings() {
  const theme = useTheme(); // Hook para acessar o tema atual

  return (
    <View style={styles(theme).container}>
      {/* Seção 'Sobre' */}
      <View style={styles(theme).section}>
        <Text style={styles(theme).sectionHeader}>Sobre</Text>

        <Text style={styles(theme).aboutText}>
          1. Esta aplicação foi desenvolvida para gerenciar metas, tarefas e ideias de forma simples e objetiva.
        </Text>

        <Text style={styles(theme).aboutText}>
          2. Sua principal função é tentar lembrar-nos do nosso norte para alcançarmos objetivos de longo prazo com muito esforço.
        </Text>

        <Text style={styles(theme).aboutText}>
          3. Na aba "Projetos", são definidos os projetos de longo prazo, que exigem a execução de tarefas relacionadas.
        </Text>

        <Text style={styles(theme).aboutText}>
          4. Na aba "Tarefas", são definidas tarefas diárias, que podem estar vinculadas aos projetos ou não.
        </Text>

        <Text style={styles(theme).aboutText}>
          5. Na aba "Não", devem ser colocados os hábitos que devemos evitar.
        </Text>

        <Text style={styles(theme).aboutText}>
          6. Na aba "Idéias", podem ser memorizados futuros projetos.
        </Text>

        <Text style={styles(theme).aboutText}>
          7. As abas devem ser visuallizadas rotineiramente. Desta forma, ele pode ajudar a manter os principais projetos em foco.
        </Text>

      </View>
    </View>
  );
}

// Função que cria estilos dinâmicos com base no tema
const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.COLORS.BACKGROUND,
    },
    section: {
      marginBottom: 30,
    },
    sectionHeader: {
      fontSize: 22,
      marginTop: 10,
      color: theme.COLORS.PRIMARY,
      marginBottom: 20, // Aumentei a margem para separar o título do texto
      fontFamily: 'Barlow-Condensed',
    },
    aboutText: {
      fontSize: 16,
      color: theme.COLORS.TEXT,
      lineHeight: 26, // Aumentei o espaçamento entre as linhas para melhorar a legibilidade
      marginBottom: 10, // Aumentei a margem inferior para dar espaço entre os parágrafos
      fontFamily: 'Barlow-Condensed',
    },
    textButton: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.COLORS.BORDER,
    },
    text: {
      fontSize: 16,
      color: theme.COLORS.TEXT,
      fontFamily: 'Barlow-Condensed',
    },
  });
