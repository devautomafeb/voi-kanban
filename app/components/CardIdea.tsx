import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Idea } from '../reducers/ideaTypes';
import { useTheme } from '../hooks/themeContext'; 

interface CardTaskIdeaProps extends Idea {
  onDelete: () => void;
}

export function CardIdea({ idea, onDelete }: CardTaskIdeaProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { COLORS } = useTheme(); // Acessando as cores do tema

  return (
    <View style={[styles.card, { backgroundColor: COLORS.YELLOW, shadowColor: COLORS.PRIMARY}]}>
      <Text style={[styles.name, { color: COLORS.TEXT_PRIMARY }]}>Nome do Projeto: {idea.name}</Text>
      <Text style={[styles.project, { color: COLORS.TEXT_SECONDARY }]}>Descrição: {idea.description}</Text>

      <TouchableOpacity style={styles.moreIcon} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="more-vert" size={24} color={COLORS.ICON_COLOR} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color={COLORS.ICON_COLOR} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Excluir idéia.</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalSettings}>
              <MaterialIcons name="close" size={24} color={COLORS.ICON_COLOR} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Fechar.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    minWidth: '85%',
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily:'Barlow-Condensed',
  },
  project: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily:'Barlow-Condensed',
  },
  moreIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'baseline',
  },
  modalSettings: {
    flexDirection: 'row',
    paddingVertical: 10,
    fontFamily: 'Barlow-Condensed',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily:'Barlow-Condensed',
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
});

export default CardIdea;
