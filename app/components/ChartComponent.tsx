import { BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useContext, useState } from 'react';
import { useTheme } from '../hooks/themeContext';
import { TaskContext } from '../hooks/tasksHook';
import { Goal } from '../reducers/goalTypes';
import { format } from 'date-fns';

interface CardProps extends Goal {
  isSimplified: boolean;
}

export function ChartComponent({ project, isSimplified }: CardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { COLORS } = useTheme();
  const { tasks } = useContext(TaskContext);

  // Processar dados para o gráfico de frequência mensal
  const completedTasksByMonth = tasks
    .filter(task => task.task.completed && task.task.relatedProject === project.name)
    .reduce((acc, task) => {
      const month = format(new Date(task.task.date), 'MMMM'); // Obtém o mês por extenso
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const monthsInPortuguese = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  // Filtrar meses com dados
  const monthLabels = months.filter(month => completedTasksByMonth[month]);
  const monthData = monthLabels.map(month => completedTasksByMonth[month] || 0);
  const monthLabelsInPortuguese = monthLabels.map(
    month => monthsInPortuguese[months.indexOf(month)]
  );

  // Prevenir erros caso não haja dados
  const barData = {
    labels: monthLabelsInPortuguese.length > 0 ? monthLabelsInPortuguese : ['Sem dados'],
    datasets: [
      {
        data: monthData.length > 0 ? monthData : [0],
      },
    ],
  };

  const freqData = {
    labels: monthLabelsInPortuguese.length > 0 ? monthLabelsInPortuguese : ['Sem dados'],
    datasets: [
      {
        data: monthData.length > 0 ? monthData.map(value => (value * 100) / 30) : [0],
      },
    ],
  };

  const totalTasks = tasks.filter(task => task.task.relatedProject === project.name).length;
  const completedTasks = monthData.reduce((sum, value) => sum + value, 0);
  const completedPercentage = totalTasks > 0 ? completedTasks / totalTasks : 0;

  const progressData = {
    labels: [''],
    data: totalTasks > 0 ? [completedPercentage] : [0],
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isSimplified ? COLORS.CARD_BACKGROUND : COLORS.GRAY_DARK,
          shadowColor: COLORS.SHADOW_COLOR,
        },
      ]}
    >
      <ScrollView>
        <View style={[styles.modalView, { backgroundColor: COLORS.WHITE_BACKGROUND }]}>
          {monthData.length === 0 && (
            <Text style={styles.noDataText}>Sem dados de tarefas concluídas.</Text>
          )}

          {/* Gráfico de barras: Frequência mensal */}
          <Text style={styles.textTitle}>Tarefas concluídas por mês</Text>
          <BarChart
            data={barData}
            width={Dimensions.get('window').width - 70}
            height={250}
            fromZero={true}
            chartConfig={{
              backgroundColor: COLORS.CARD_BACKGROUND,
              backgroundGradientFrom: COLORS.SECONDARY,
              backgroundGradientTo: COLORS.CARD_BACKGROUND,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            yAxisLabel="" // Adicionando um rótulo vazio no eixo Y
            yAxisSuffix="" // Sufixo vazio no eixo Y
            style={{ marginVertical: 16, borderRadius: 10 }}
          />


          {/* Gráfico de linha: Frequência mensal [%] */}
          <Text style={styles.textTitle}>Frequência de Tarefas Mensal [%]</Text>
          <LineChart
            data={freqData}
            width={Dimensions.get('window').width - 70}
            height={220}
            fromZero={true}
            chartConfig={{
              backgroundColor: COLORS.CARD_BACKGROUND,
              backgroundGradientFrom: COLORS.SECONDARY,
              backgroundGradientTo: COLORS.CARD_BACKGROUND,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{ marginVertical: 16, borderRadius: 10 }}
          />

          {/* Gráfico de progresso: Porcentagem de tarefas concluídas */}
          <Text style={styles.textTitle}>Progresso de tarefas</Text>
          <ProgressChart
            data={progressData}
            width={Dimensions.get('window').width - 70}
            height={250}
            strokeWidth={10}
            radius={42}
            chartConfig={{
              backgroundColor: COLORS.CARD_BACKGROUND,
              backgroundGradientFrom: COLORS.SECONDARY,
              backgroundGradientTo: COLORS.CARD_BACKGROUND,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{ marginVertical: 16, borderRadius: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    borderRadius: 8,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Barlow-Condensed',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
    fontFamily: 'Barlow-Condensed',
  },
});
