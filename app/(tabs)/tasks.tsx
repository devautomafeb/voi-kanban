import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, SectionList, Text, StyleSheet } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { CardTask } from '../components/CardTask';
import { ListEmpty } from '../components/ListEmpty';
import { TaskContext } from '../hooks/tasksHook';
import { FormTask } from '../components/FormTask';
import { useTheme } from '../hooks/themeContext';
import { MaterialIcons } from '@expo/vector-icons'; // Ícone de filtro e visibilidade

export default function Tasks() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Para armazenar a tarefa que está sendo editada
  const [filterName, setFilterName] = useState(''); // Estado para o filtro por nome
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); // Controla a exibição de tarefas concluídas
  const { tasks, delTask, checkTask } = useContext(TaskContext);
  const theme = useTheme();

  // Estilos criados dinamicamente com base no tema
  const styles = createStyles(theme);

  // Função para alternar a exibição de tarefas concluídas
  const toggleShowCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks); // Alterna o estado
  };

  // Função para abrir o modal de edição
  const handleEditTask = (task: any) => {
    setSelectedTask(task); // Definir a tarefa que está sendo editada
    setModalVisible(true); // Abrir o modal
  };

  // Função para salvar a edição ou criação de nova tarefa
  const handleSaveTask = (task: any) => {
    setSelectedTask(null); // Limpar a tarefa selecionada após salvar
    setModalVisible(false); // Fechar o modal
  };

  // Função para mapear o número do dia da semana para o nome
  const getDayName = (dayNumber: number) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[dayNumber];
  };

  // Filtrando as tarefas pelo nome e pela visibilidade de tarefas concluídas
  const filteredTasks = tasks
    .filter(task =>
      task.task.description.toLowerCase().includes(filterName.toLowerCase()) // Verifica se o nome da tarefa contém o filtro
    )
    .filter(task => showCompletedTasks || !task.task.completed); // Verifica se a tarefa está concluída, dependendo do estado

  // Lista fixa de dias da semana
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado','Domingo'];

  // Função para agrupar tarefas por dia da semana, removendo os dias sem tarefas
  const groupedTasks = weekDays
    .map(day => ({
      title: day,
      data: filteredTasks
        .filter(task => getDayName(new Date(task.task.date).getDay()) === day) // Verifica se a tarefa pertence ao dia
    }))
    .filter(group => group.data.length > 0); // Remove dias que não têm tarefas

  return (
    <View style={styles.container}>
      {/* Header com campo de busca, ícone de filtro e visibilidade */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterIcon}>
          <MaterialIcons name="filter-list" size={28} color={theme.COLORS.PRIMARY} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Filtrar por nome..."
          placeholderTextColor={theme.COLORS.TEXT_DISABLED}
          value={filterName}
          onChangeText={setFilterName} // Atualiza o filtro conforme o usuário digita
        />
        <TouchableOpacity onPress={toggleShowCompletedTasks} style={styles.visibilityIcon}>
          <MaterialIcons
            name={showCompletedTasks ? "visibility" : "visibility-off"}
            size={28}
            color={theme.COLORS.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={groupedTasks} // Usando os dias da semana fixos
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardTask
            id={item.id}
            task={item.task}
            onDelete={() => delTask(item)}
            onComplete={() => checkTask(item)}
            onEdit={() => handleEditTask(item)} // Chamando a função de edição
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre sua primeira tarefa' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />

      <ButtonAdd onPress={() => setModalVisible(true)} text={'Adicionar Tarefa'} />

      {/* Modal de Formulário, tanto para adicionar quanto para editar */}
      <FormTask
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTask} // Função para salvar
        task={selectedTask} // Passa a tarefa selecionada para o modal, se houver
      />
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
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      marginBottom: 20,
      width: '100%', // Ocupa a largura total
    },
    searchInput: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
      color: '#000',
    },
    filterIcon: {
      padding: 5,
    },
    visibilityIcon: {
      padding: 5,
    },
    sectionHeader: {
      backgroundColor: theme.COLORS.BACKGROUND,
      padding: 5,
    },
    sectionTitle: {
      fontSize: 18,
      color: theme.COLORS.TEXT,
      fontFamily: 'Barlow-Condensed',
      marginBottom: 2,
    },
  });
