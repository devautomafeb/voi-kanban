import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Modal, View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {Calendar}  from './Calendar';
import { GoalContext } from '../hooks/goals';
import { Goal, projectData } from '../reducers/goalTypes';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useTheme } from '../hooks/themeContext';

dayjs.extend(isSameOrAfter);

interface FormGoalProps {
  visible: boolean;
  onClose: () => void;
  goalToEdit?: Goal; // Prop opcional para a meta a ser editada
}

export const FormGoal: React.FC<FormGoalProps> = ({ visible, onClose, goalToEdit }) => {
  const { addGoals, editGoals } = useContext(GoalContext);
  const { COLORS } = useTheme();

  const [project, setProject] = useState<projectData>({ name: '', description: '' });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [importance, setImportance] = useState<number>(10);
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  // Use Effect para carregar dados da meta a ser editada
  useEffect(() => {
    if (goalToEdit) {
      setProject(goalToEdit.project);
      setStartDate(new Date(goalToEdit.startDate));
      setEndDate(new Date(goalToEdit.endDate));
      setImportance(parseInt(goalToEdit.importance)); // Supondo que 'importance' seja um string
    } else {
      resetForm();
    }
  }, [goalToEdit]);

  const handleAddOrEditGoal = useCallback(() => {
    if (project.name && importance && dayjs(endDate).isSameOrAfter(startDate)) {
      const quality = classifyProject(importance);
      const goal: Goal = {
        id: goalToEdit ? goalToEdit.id : Math.round(100000 * Math.random()), // Usar o mesmo ID se estiver editando
        project,
        importance: quality.toString(),
        startDate,
        endDate,
      };
      
      if (goalToEdit) {
        editGoals(goal); // Edita a meta se já existir
      } else {
        addGoals(goal); // Adiciona nova meta
      }

      resetForm(); // Reseta o formulário após a adição/edição
      onClose(); // Fecha o modal
    } else {
      Alert.alert(
        dayjs(endDate).isBefore(startDate)
          ? 'A data de término não pode ser anterior à data de início.'
          : 'Por favor, preencha todos os campos.'
      );
    }
  }, [project, importance, startDate, endDate, goalToEdit]);

  const handleStartChange = useCallback((selectedDate: Date) => {
    setStartDate(selectedDate);
  }, []);

  const handleEndChange = useCallback((selectedDate: Date) => {
    setEndDate(selectedDate);
  }, []);

  const classifyProject = useCallback((importance: number) => {
    if (importance >= 0 && importance <= 20) return 'Baixa';
    if (importance > 20 && importance <= 40) return 'Requer atenção';
    if (importance > 40 && importance <= 60) return 'Média';
    if (importance > 60 && importance <= 80) return 'Alta';
    if (importance > 80 && importance <= 100) return 'Urgente';
    return 'Valor inválido'; // Para valores fora do intervalo esperado
  }, []);
  

  const resetForm = useCallback(() => {
    setProject({ name: '', description: '' });
    setImportance(0);
    setStartDate(new Date());
    setEndDate(new Date());
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: COLORS.CARD_BACKGROUND }]}>
          <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY}]}>
            {goalToEdit ? 'Editar Projeto' : 'Novo Projeto'}
          </Text>
          
          <Text style={[styles.label, { color: COLORS.TEXT_PRIMARY }]}>Nome do Projeto</Text>
          <TextInput
            placeholder="Nome do Projeto"
            style={[styles.input, { borderColor: COLORS.GRAY_DARK, color: COLORS.TEXT_PRIMARY }]}
            value={project.name}
            onChangeText={(text) => setProject({ ...project, name: text })}
            multiline={true}
          />
          
          <Text style={[styles.label, { color: COLORS.TEXT_PRIMARY}]}>Descrição do Projeto</Text>
          <TextInput
            placeholder="Descrição do Projeto"
            style={[styles.input, { borderColor: COLORS.GRAY_DARK, color: COLORS.TEXT_PRIMARY, minHeight: 60, maxHeight: 120 }]}
            value={project.description}
            onChangeText={(text) => setProject({ ...project, description: text })}
            multiline={true}
            numberOfLines={3}
          />

<View style={styles.dateRow}>
  <View style={styles.dateContainer}>
    <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartPicker(true)}>
      <Text style={[styles.label, { color: COLORS.TEXT_PRIMARY }]}>
      <MaterialIcons name={"date-range"} size={24} color={COLORS.TEXT_PRIMARY} />
      Data de Início:
      </Text>
      <Text style={[styles.dateText, { color: COLORS.TEXT_PRIMARY }]}>{dayjs(startDate).format('DD/MM/YYYY')}</Text>
    </TouchableOpacity>
    <Calendar
      isVisible={showStartPicker}
      mode="date"
      onChange={handleStartChange}
      onClose={() => setShowStartPicker(false)}
    />
  </View>

  <View style={styles.dateContainer}>
    <TouchableOpacity style={styles.datePicker} onPress={() => setShowEndPicker(true)}>
      <Text style={[styles.label, { color: COLORS.TEXT_PRIMARY }]}>
      <MaterialIcons name={"date-range"} size={24} color={COLORS.TEXT_PRIMARY} />
      Data de Fim:</Text>
      <Text style={[styles.dateText, { color: COLORS.TEXT_PRIMARY }]}>{dayjs(endDate).format('DD/MM/YYYY')}</Text>
    </TouchableOpacity>
    <Calendar
      isVisible={showEndPicker}
      mode="date"
      onChange={handleEndChange}
      onClose={() => setShowEndPicker(false)}
    />
  </View>
</View>


          <Text style={[styles.label, { color: COLORS.TEXT_PRIMARY, fontSize:22 ,marginTop:20}]}>
            Importância: {classifyProject(importance)} {importance}%
          </Text>
          <Slider
            style={{ width: '100%', height:50 }}
            minimumValue={0}
            maximumValue={100}
            step={20}
            value={importance}
            onValueChange={(value) => setImportance(value)}
            thumbTintColor={COLORS.TEXT_PRIMARY}
            maximumTrackTintColor={COLORS.GRAY_LIGHT}
            minimumTrackTintColor={COLORS.GRAY_DARK}
          />
          
          <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.GRAY_DARK, marginTop: 40 }]} onPress={handleAddOrEditGoal}>
            <Text style={styles.buttonText}>{goalToEdit ? 'Salvar Alterações' : 'Adicionar Projeto'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose, { backgroundColor: COLORS.RED}]} onPress={() => { resetForm(); onClose(); }}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Barlow-Condensed',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize:20,
    fontFamily: 'Barlow-Condensed',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para espaçar os dois seletores
    width: '100%', // Ocupar toda a largura
    marginBottom: 20,
  },
  dateContainer: {
    // Cada date picker ocupa o mesmo espaço
    width:'46%'
  },
  datePicker: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonClose: {
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    
    fontFamily: 'Barlow-Condensed',
  },
});
