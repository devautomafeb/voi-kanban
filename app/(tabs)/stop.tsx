import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { ListEmpty } from '../components/ListEmpty';
import { FormStop } from '../components/FormStop';
import { StopContext } from '../hooks/stopHook';
import { CardStop } from '../components/CardStop';
import { useTheme } from '../hooks/themeContext'; // Importando o useTheme

export default function Stop() {
  const [modalVisible, setModalVisible] = useState(false);
  const { stops, delStop } = useContext(StopContext);
  const theme = useTheme(); // Usando o hook useTheme

  // Estilos criados dinamicamente com base no tema
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <FlatList
        data={stops}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardStop
            id={item.id}
            stop={item.stop}
            onDelete={() => delStop(item)}
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre seu primeiro Não' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar'} />
      <FormStop visible={modalVisible} onClose={() => setModalVisible(false)} />
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
  });
