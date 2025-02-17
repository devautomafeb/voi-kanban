import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { ListEmpty } from '../components/ListEmpty';
import { FormIdea } from '../components/FormIdea';
import { IdeaContext } from '../hooks/ideaHook';
import { CardIdea } from '../components/CardIdea';
import { useTheme } from '../hooks/themeContext'; // Importando o useTheme

export default function Idea() {
  const [modalVisible, setModalVisible] = useState(false);
  const { ideas, delIdea } = useContext(IdeaContext);
  const theme = useTheme(); // Usando o hook useTheme

  // Estilos criados dinamicamente com base no tema
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <FlatList
        data={ideas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardIdea
            id={item.id}
            idea={item.idea}
            onDelete={() => delIdea(item)}
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre sua primeira Idéia' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Idéia'} />
      <FormIdea visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

// Função que cria os estilos dinamicamente com base no tema
const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.COLORS.WHITE_BACKGROUND, // Usando a cor do tema
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      fontFamily: 'Barlow-Condensed',
      color: theme.COLORS.PRIMARY, // Usando a cor do tema
    },
    // Adicione outros estilos que você deseja personalizar usando o tema
  });
