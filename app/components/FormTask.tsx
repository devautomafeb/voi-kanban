import React, { useContext, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TaskContext } from '../hooks/tasksHook';
import { GoalContext } from '../hooks/goals';
import { Task, taskData } from '../reducers/taskTypes';
import { Goal } from '../reducers/goalTypes';
import { useTheme } from '../hooks/themeContext';

interface FormTaskProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: any) => void; // Adicionando onSave com o tipo correto
  task: any | null; // Tarefa que pode ser nula ou ter dados
}


export const FormTask: React.FC<FormTaskProps> = ({ visible, onClose, task, onSave }) => {
  const { COLORS } = useTheme();
  const { addTask, editTask } = useContext(TaskContext);
  const { goals } = useContext(GoalContext);

  // Se uma tarefa for passada como prop, atualiza o estado para essa tarefa
  const [formTask, setFormTask] = useState<taskData>(task || { description: '', date: new Date(), completed: false, recurring: false });
  const [relatedProject, setRelatedProject] = useState<string>(task?.relatedProject || '');
  const [menuVisible, setMenuVisible] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState<number>(task?.recurringInterval || 1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Função para adicionar ou editar a tarefa
  const handleSaveTask = () => {
    if (formTask.description) {
      const newTask: Task = {
        id: task?.id || Math.round(100000 * Math.random()), // Usar ID da tarefa existente ou gerar novo
        task: { ...formTask, relatedProject, recurringInterval },
      };
  
      if (task) {
        // Se task já existir, editamos a tarefa
        editTask(newTask);
      } else {
        // Se task não existir, adicionamos uma nova tarefa
        addTask(newTask);
      }
  
      onSave(newTask); // Chama a função onSave após salvar
      setFormTask({ description: '', date: new Date(), completed: false, recurring: false });
      setRelatedProject('');
      onClose();
    }
  };
  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const selectProject = (projectName: string) => {
    setRelatedProject(projectName);
    setMenuVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setFormTask({ ...formTask, date });
    hideDatePicker();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
          <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Text>

          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Descrição da Tarefa</Text>
          <TextInput
            placeholder="Tarefa..."
            style={[styles.input, { borderColor: COLORS.GRAY_MEDIUM, color: COLORS.TEXT_PRIMARY }]}
            value={formTask.description}
            onChangeText={(text) => setFormTask({ ...formTask, description: text })}
            multiline={true}
          />

          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Data da Tarefa</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
            <Text style={[styles.dateText, { color: COLORS.TEXT_PRIMARY }]}>
              {formTask.date ? formTask.date.toLocaleDateString() : 'Selecione uma data'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="pt-BR"
            date={formTask.date}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />

          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Projeto Relacionado</Text>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Text style={[styles.menuButtonText, { color: COLORS.TEXT_PRIMARY }]}>
              {relatedProject ? relatedProject : 'Selecione um projeto'}
            </Text>
            <MaterialIcons name={menuVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color={COLORS.ICON_COLOR} />
          </TouchableOpacity>

          {menuVisible && (
            <View style={[styles.menuContainer, { borderColor: COLORS.GRAY_MEDIUM }]}>
              <ScrollView>
                {goals.length > 0 ? (
                  goals.map((goal) => (
                    <TouchableOpacity
                      key={goal.id}
                      style={styles.menuItem}
                      onPress={() => selectProject(goal.project.name)}
                    >
                      <Text style={[styles.menuItemText, { color: COLORS.TEXT_PRIMARY }]}>
                        {goal.project.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={[styles.menuItemText, { color: COLORS.TEXT_PRIMARY }]}>Nenhum projeto disponível</Text>
                )}
              </ScrollView>
            </View>
          )}

          <View style={styles.switchContainer}>
            <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY, marginRight: 30 }]}>Tarefa Recorrente?</Text>
            <Switch
              value={formTask.recurring}
              onValueChange={(value) => setFormTask({ ...formTask, recurring: value })}
              trackColor={{ false: COLORS.GRAY_LIGHT, true: COLORS.GRAY_DARK }}
            />
            {formTask.recurring && (
              <TextInput
                style={[
                  styles.label,
                  {
                    borderColor: COLORS.PRIMARY,
                    backgroundColor: COLORS.CARD_BACKGROUND,
                    color: COLORS.TEXT_PRIMARY,
                    marginLeft: 20,
                    fontSize: 18,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,
                    minWidth: 90,
                  },
                ]}
                placeholder="Dias"
                keyboardType="numeric"
                value={String(recurringInterval)}
                onChangeText={(text) => setRecurringInterval(Number(text))}
              />
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.GRAY_DARK }]}
            onPress={handleSaveTask}
          >
            <Text style={[styles.buttonText, { color: COLORS.TEXT_LIGHT }]}>
              {task ? 'Salvar' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, { backgroundColor: COLORS.RED }]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: COLORS.TEXT_LIGHT }]}>Fechar</Text>
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
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'Barlow-Condensed',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 90,
    padding: 10,
    fontSize: 20,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontFamily: 'Barlow-Condensed',
  },
  dateButton: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'Barlow-Condensed',
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  menuButtonText: {
    fontSize: 18,
    fontFamily: 'Barlow-Condensed',
  },
  menuContainer: {
    maxHeight: 150,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 18,
    fontFamily: 'Barlow-Condensed',
  },
  switchContainer: {
    textAlign:'auto',
    justifyContent:'center',
    alignContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
  buttonClose: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
});
