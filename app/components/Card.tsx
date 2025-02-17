import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Goal } from '../reducers/goalTypes'; // Assegure-se de que as tarefas estejam incluídas no tipo Goal
import { useTheme } from '../hooks/themeContext';
import { MyCalendar } from './MyCalendar';
import { MarkedDates } from 'react-native-calendars/src/types';
import { TaskContext } from '../hooks/tasksHook'; // Certifique-se de que o caminho esteja correto
import { isSameDay } from 'date-fns'; // Importando corretamente a função isSameDay
import { ChartComponent } from './ChartComponent';


interface CardProps extends Goal {
  onDelete: () => void;
  onComplete: () => void;
  onEdit: () => void;
  isSimplified: boolean;
}

export function Card({
  project,
  importance,
  startDate,
  endDate,
  completed,
  onDelete,
  onComplete,
  onEdit,
  isSimplified,
}: CardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullscreenModalVisible, setFullscreenModalVisible] = useState(false);
  const { COLORS } = useTheme();
  const { tasks } = useContext(TaskContext); // Obtendo as tarefas do contexto

  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();

  function diffDates(endDate: string | Date) {
    const start = new Date(); // Data atual
    const end = new Date(endDate);
    const timeDiff = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
      - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

    return Math.round(timeDiff / (1000 * 60 * 60 * 24)); // diferença em dias
  }

  const remainingDays = diffDates(endDate);

  const closeModal = () => {
    setModalVisible(false);
    setFullscreenModalVisible(false);
  };

  const contributionData: MarkedDates = Array.isArray(tasks)
    ? tasks
      .filter(task => task.task.completed && task.task.relatedProject === project.name) // Filtrar tarefas completadas e relacionadas ao projeto
      .reduce((acc: MarkedDates, task) => {
        const taskCompletionDate = new Date(task.task.date); // Usar a data de conclusão da tarefa
        const formattedDate = taskCompletionDate.toISOString().split('T')[0]; // Converter para formato 'YYYY-MM-DD'

        acc[formattedDate] = { marked: true, color: COLORS.GREEN_PEN, textColor: COLORS.PRIMARY }; // Aplicando a cor do tema
        return acc;
      }, {})
    : {};


  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isSimplified && completed ? COLORS.LIGHT_GREEN : COLORS.CARD_BACKGROUND,
          shadowColor: COLORS.SHADOW_COLOR,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
          setFullscreenModalVisible(true);
        }}
        style={styles.modalSettings}
      >
        {isSimplified ? (
          <View>
            <View style={styles.textWithIcon}>
              {importance === "Urgente" && (
                <MaterialIcons name="info" size={20} color={COLORS.RED} style={{ marginLeft: 5, marginRight:10 }} />
              )}
              {importance === "Alta" && (
                <MaterialIcons name="info" size={20} color={COLORS.RED} style={{ marginLeft: 5, marginRight:10 }} />
              )}
              {importance === "Média" && (
                <MaterialIcons name="info" size={20} color={COLORS.YELLOW} style={{ marginLeft: 5, marginRight:10 }} />
              )}
              {importance === "Requer atenção" && (
                <MaterialIcons name="info" size={20} color={COLORS.BUTTON_SECONDARY} style={{ marginLeft: 5, marginRight:10 }} />
              )}
              {importance === "Baixa" && (
                <MaterialIcons name="info" size={20} color={COLORS.BUTTON_PRIMARY} style={{ marginLeft: 5, marginRight:10 }} />
              )}
              <Text style={[styles.name, { color: COLORS.TEXT_PRIMARY }]}>
                Projeto: {project.name} 
              </Text>
            </View>

            {completed && (
              <>
                <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
                <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>Projeto concluído</Text>
              </>
            )}
            {!completed && (
              <>
                <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
                <View style={styles.textWithIcon}>
                  <MaterialIcons
                    name={remainingDays <= 0 ? "hourglass-bottom" : "hourglass-top"}
                    size={20}
                    color={remainingDays <= 0 ? COLORS.RED : COLORS.ICON_COLOR}
                    style ={{marginLeft:10}}
                  />
                  <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>

                    {remainingDays <= 0
                      ? 'O prazo está terminado.'
                      : remainingDays < 1 && remainingDays > 0
                        ? 'O prazo se encerra em menos de 24 horas.'
                        : `${remainingDays == 1 ? 'Resta apenas' : 'Restam'} ${remainingDays} ${remainingDays === 1 ? 'dia para encerrar o prazo' : 'dias para encerrar o prazo'}.`}
                  </Text>
                </View>
              </>
            )}
          </View>
        ) : (
          <View>
            <View style={styles.textWithIcon}>
              <Text style={[styles.name, { color: COLORS.TEXT_PRIMARY }]}>{project.name}</Text>
            </View>
            <View style={styles.textWithIcon}>
              <Text style={[styles.project, { color: COLORS.TEXT_SECONDARY }]}>Descrição: {project.description}</Text>
            </View>
            <View style={styles.textWithIcon}>
              <MaterialIcons name={"double-arrow"} size={14} color={COLORS.ICON_COLOR} />
              <Text style={[styles.importance, { color: COLORS.TEXT_SECONDARY }]}>Prioridade: {importance}</Text>
            </View>
            <View style={styles.textWithIcon}>
              <MaterialIcons name={completed ? "check-circle" : "cancel"} size={20} color={completed ? COLORS.GREEN : COLORS.RED} />
              <Text style={[styles.completed, { color: COLORS.TEXT_SECONDARY }]}>
                Situação: {completed ? 'Projeto finalizado.' : 'Projeto não completado.'}
              </Text>
            </View>
            <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
            <View style={styles.textWithIcon}>
              <MaterialIcons name="date-range" size={20} color={COLORS.ICON_COLOR} />
              <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>
                Duração: de {formattedStartDate} até {formattedEndDate}
              </Text>
            </View>
            <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>
              <View style={styles.textWithIcon}>
                <Text style={[styles.dates, { color: COLORS.TEXT_SECONDARY }]}>
                  {remainingDays <= 0
                    ? 'O prazo está terminado.'
                    : remainingDays < 1 && remainingDays > 0
                      ? 'O prazo se encerra em menos de 24 horas.'
                      : `${remainingDays <= 1 ? 'Resta apenas' : 'Restam'} ${remainingDays} ${remainingDays === 1 ? 'dia para encerrar o prazo' : 'dias para encerrar o prazo'}.`}
                </Text>
              </View>
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.moreIcon}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Mais opções"
          accessibilityRole="button"
        >
          <MaterialIcons name="more-vert" size={24} color={COLORS.ICON_COLOR} />
        </TouchableOpacity>

        {/* Modal de opções */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, { backgroundColor: COLORS.CARD_BACKGROUND }]}>

              <TouchableOpacity style={styles.modalSettings} onPress={onComplete}>
                <MaterialIcons name={completed ? "check-circle" : "check-circle-outline"} size={24} color={COLORS.ICON_COLOR} />
                <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>{completed ? "Projeto Concluído" : "Finalizar Projeto"} </Text>
              </TouchableOpacity>
              <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />

              <TouchableOpacity style={styles.modalSettings} onPress={onEdit}>
                <MaterialIcons name="edit" size={24} color={COLORS.ICON_COLOR} />
                <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Editar</Text>
              </TouchableOpacity>

              <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
              <TouchableOpacity style={styles.modalSettings} onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color={COLORS.ICON_COLOR} />
                <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Excluir</Text>
              </TouchableOpacity>

              <View style={[styles.separator, { backgroundColor: COLORS.SEPARATOR }]} />
              <TouchableOpacity style={styles.modalSettings} onPress={closeModal}>
                <MaterialIcons name="cancel" size={24} color={COLORS.ICON_COLOR} />
                <Text style={[styles.optionText, { color: COLORS.TEXT_PRIMARY }]}>Cancelar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>


        {/* Modal de tela cheia */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={fullscreenModalVisible}
          onRequestClose={closeModal}

        >
          <View style={styles.fullscreenModalContainer}>
            <View style={[styles.modalHeader, { backgroundColor: COLORS.PRIMARY }]}>
              <Text style={[styles.headerTitle, { color: COLORS.SECONDARY }]}>Detalhes do Projeto</Text>
              <TouchableOpacity onPress={closeModal} style={styles.headerCloseButton}>
                <MaterialIcons name="close" size={28} color={COLORS.RED} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.tableList}>
                <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Nome: {project.name}</Text>
                <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Descrição: {project.description}</Text>
                <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Prioridade: {importance}</Text>
                <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Situação: {completed ? 'Finalizado' : 'Não finalizado'}</Text>
                <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Duração: de {formattedStartDate} até {formattedEndDate}</Text>
                <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Restam {remainingDays} dias.</Text>
              </View>
              {/* Gráfico de contribuição */}
              <MyCalendar contributionData={contributionData} tasks={tasks.filter(task => task.task.relatedProject === project.name)} />
            
               {/* Gráfico de contribuição */}
               <ChartComponent
                  project={project}
                  startDate={startDate}
                  importance=''
                  endDate={endDate}
                  isSimplified={isSimplified}
                  id={1000*Math.random()}
                 />
            </ScrollView>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 8,
    padding: 15,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tableList: {
    borderWidth: 1, // Largura da borda ao redor do calendário
    borderColor: 'gray', // Cor da borda
    marginVertical: 5, // Margem vertical ao redor do calendário
    borderRadius: 5,
    padding: 10
  },
  name: {
    fontSize: 20,
    fontFamily: 'Barlow-Condensed'
  },
  project: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
    marginRight: 40,
  },
  importance: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Barlow-Condensed'
  },
  completed: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Barlow-Condensed'
  },
  dates: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Barlow-Condensed'
  },
  separator: {
    height: 1,
    marginVertical: 10,
  },
  moreIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  fullscreenModalContainer: {
    flex: 1,

  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,

  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
  headerCloseButton: {
    padding: 10,
  },
  scrollContainer: {
    padding: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
    marginBottom: 8,
    padding: 5,
  },
  closeButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontFamily: 'Barlow-Condensed',
    fontSize: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 0,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '90%',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Barlow-Condensed'
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    
  },
}); 
