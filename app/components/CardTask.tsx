import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Task } from '../reducers/taskTypes';
import { GoalContext } from '../hooks/goals'; // Importar o contexto das metas
import { useTheme } from '../hooks/themeContext'; // Importar o contexto de tema

interface CardTaskProps extends Task {
  onDelete: () => void;
  onComplete: () => void;
  onEdit: () => void;  // Função para editar a tarefa
}

export function CardTask({ task, onDelete, onComplete, onEdit }: CardTaskProps) {
  const { COLORS } = useTheme(); // Acessa as cores do tema
  const [modalVisible, setModalVisible] = useState(false);
  const [filterName, setFilterName] = useState(''); // Filtro de nome
  const formattedDate = new Date(task.date).toLocaleDateString();

  // Filtro para nome da tarefa
  if (filterName && !task.description.toLowerCase().includes(filterName.toLowerCase())) {
    return null; // Não exibe o card se o nome da tarefa não corresponder ao filtro
  }

  // Definir a cor de fundo dependendo se a tarefa está completa ou não
  const cardBackgroundColor = task.completed ? COLORS.GRAY_DARK : COLORS.CARD_BACKGROUND;

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
      <TouchableOpacity onPress={onComplete} style={styles.checkIcon}>
        <MaterialIcons
          name={task.completed ? "check-box" : "check-box-outline-blank"}
          size={28}
          color={task.completed ? COLORS.GREEN : COLORS.BUTTON_DISABLED}
        />
      </TouchableOpacity>
      
      <View style={styles.taskDetails}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, { color: task.completed ? COLORS.TEXT_DISABLED : COLORS.TEXT_PRIMARY }]}>
            {task.description}
          </Text>
          <TouchableOpacity style={styles.moreIcon} onPress={() => setModalVisible(true)}>
            <MaterialIcons name="more-vert" size={20} color={COLORS.GRAY_LIGHT} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={[styles.date, { color: COLORS.GRAY_MEDIUM }]}>{formattedDate}</Text>
          {task.recurring && (
            <View style={styles.recurringIconContainer}>
              <MaterialIcons name="repeat" size={20} color={COLORS.BLUE_SOFT} />
              <Text style={[styles.recurringText, { color: COLORS.GRAY_MEDIUM}]}>
                {task.recurringInterval !=1 ? `${task.recurringInterval} dias` : 'Diário'}
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.project, { color: COLORS.GRAY_MEDIUM }]}>
          Projeto: {task.relatedProject}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>

            <TouchableOpacity onPress={onDelete} style={styles.modalSettings}>
              <MaterialIcons name="delete" size={24} color={COLORS.PRIMARY} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Excluir tarefa</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalSettings}>
              <MaterialIcons name="close" size={24} color={COLORS.PRIMARY} />
              <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15, // Reduzido
    borderRadius: 10, // Reduzido
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 }, // Reduzido
    shadowOpacity: 0.1, // Reduzido
    shadowRadius: 4, // Reduzido
    elevation: 2, // Reduzido
    minWidth: '85%',
    margin:10
  },
  checkIcon: {
    marginRight: 10, // Reduzido
  },
  taskDetails: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginRight:10
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Barlow-Condensed',
  },
  project: {
    fontSize: 18,
    fontFamily: 'Barlow-Condensed',
    marginTop: 5,
  },
  recurringText: {
    fontSize: 16,
    fontFamily: 'Barlow-Condensed',
    fontStyle: 'italic',
  },
  moreIcon: {
    padding: 5
  },
  recurringIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:40
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
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'baseline',
  },
  modalSettings: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Barlow-Condensed',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
});
