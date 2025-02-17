import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ButtonAdd } from '../components/ButtonAdd';
import { FormGoal } from '../components/FormGoal';
import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { GoalContext } from '../hooks/goals';
import { useTheme } from '../hooks/themeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Goal } from '../reducers/goalTypes';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { goals, delGoals, checkGoals } = useContext(GoalContext);
  
  const [isSimplified, setIsSimplified] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);
  const { COLORS } = useTheme();

  const toggleViewForAll = () => {
    setIsSimplified(prevState => !prevState);
  };

  const filterGoals = () => {
    if (filter === 'completed') {
      return goals.filter(goal => goal.completed);
    }
    if (filter === 'notCompleted') {
      return goals.filter(goal => !goal.completed);
    }
    return goals; // Se for 'all', retorna todos os projetos
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setModalVisible(true); // Abre o formulário para edição
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
      <View style={[styles.header, { backgroundColor: COLORS.PRIMARY }]}>
        <View style={styles.textGroup}>
          
        <TouchableOpacity onPress={() => setFilter('all')} style={styles.textButton}>
            <Text style={[
              styles.filterText, 
              { color: filter === 'all' ? COLORS.GREEN_PEN : COLORS.SECONDARY }
            ]}>
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('notCompleted')} style={styles.textButton}>
            <Text style={[
              styles.filterText, 
              { color: filter === 'notCompleted' ? COLORS.GREEN_PEN  : COLORS.SECONDARY }
            ]}>
              Em andamento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('completed')} style={styles.textButton}>
            <Text style={[
              styles.filterText, 
              { color: filter === 'completed' ? COLORS.GREEN_PEN : COLORS.SECONDARY }
            ]}>
              Concluídos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleViewForAll} style={{ margin: 5 }}>
            <MaterialIcons 
              name={isSimplified ? "expand-more" : "expand-less"} 
              size={36} 
              color={COLORS.SECONDARY} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filterGoals()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            project={item.project}
            importance={item.importance}
            startDate={item.startDate}
            endDate={item.endDate}
            completed={item.completed}
            onDelete={() => delGoals(item)}
            onComplete={() => checkGoals(item)}
            onEdit={() => handleEdit(item)} // Passar função de edição
            isSimplified={isSimplified}
          />
        )}
        ListEmptyComponent={<ListEmpty message='Cadastre seu primeiro projeto.' />}
        contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
        style={{ flex: 1, marginBottom:10,alignSelf: 'stretch' }}
      />
      <ButtonAdd style={{padding:10}} onPress={() => setModalVisible(true)} text={'Adicionar Projeto'} />

      <FormGoal 
        visible={modalVisible} 
        onClose={() => {
          setModalVisible(false);
          setEditingGoal(undefined); // Resetar a meta em edição ao fechar
        }}
        goalToEdit={editingGoal} // Altere para goalToEdit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    elevation: 2,
    marginBottom: 10,
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textButton: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'Barlow-Condensed', // Aplicar fonte "Barlow Condensed"
  },
});
