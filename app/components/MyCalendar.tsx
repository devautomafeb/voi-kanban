import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTheme } from '../hooks/themeContext';
import { Task } from '../reducers/taskTypes'; // Ajuste o caminho conforme necessário



// Configuração para a localidade 'pt-br' no calendário
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

interface MyCalendarComponentProps {
  contributionData: {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      selectedColor?: string;
      dotColor?: string;
      disabled?: boolean;
    };
  };
  tasks?: Task[]; // Agora tasks é um array de Task diretamente
}

export function MyCalendar({ contributionData, tasks = [] }: MyCalendarComponentProps) {
  const { COLORS } = useTheme(); // Usa o tema definido pelo hook useTheme

  // Calcular a quantidade de dias marcados no calendário
  const markedDaysCount = Object.keys(contributionData).length;

  return (
    <View style={styles.container}>

      {/* Lista de tarefas realizadas */}
      {tasks.length > 0 && ( // Verifica se tasks possui elementos antes de renderizar
        <View style={styles.tableList}>
          {/* Título com a contagem de tarefas realizadas */}
          <Text style={[styles.title, { color: COLORS.TEXT_PRIMARY }]}>
            Tarefas Realizadas: {markedDaysCount}
          </Text>
          {tasks
            .filter(task => task.task.completed) // Filtra apenas as tarefas concluídas
            .map(task => (
              <View key={task.id} style={styles.completedTaskItem}>
                <Text style={[styles.taskText, { color: COLORS.TEXT_SECONDARY }]}>
                  {task.task.description} - Concluída em {new Date(task.task.date).toLocaleDateString()}
                </Text>
              </View>
            ))}
        </View>
      )}

      {/* Componente do calendário */}
      <Calendar
        current={new Date().toISOString().split('T')[0]} // Define a data atual no formato YYYY-MM-DD
        markingType={'period'} // Define o tipo de marcação para 'period'
        markedDates={contributionData} // Passa as datas marcadas para o calendário
        style={styles.calendar}
        theme={{
          todayTextColor: COLORS.PRIMARY, // Cor do texto de hoje
          dayTextColor: COLORS.TEXT_PRIMARY, // Cor do texto dos dias
          monthTextColor: COLORS.TEXT_PRIMARY, // Cor do texto do mês
          textDayFontFamily: 'Barlow-Condensed', // Fonte para os dias
          textMonthFontFamily: 'Barlow-Condensed', // Fonte para o mês
          arrowColor: COLORS.PRIMARY, // Cor das setas de navegação
          textSectionTitleColor: COLORS.TEXT_SECONDARY, // Cor do título da seção (ex: Mês)
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Mantém os elementos organizados em coluna
  },
  tableList: {
    borderWidth: 1, // Largura da borda ao redor do calendário
    borderColor: 'gray', // Cor da borda
    marginVertical: 5, // Margem vertical ao redor do calendário
    borderRadius: 5
  },

  title: {
    fontSize: 24, // Tamanho da fonte do título
    marginBottom: 10, // Margem abaixo do título
    fontFamily: 'Barlow-Condensed', // Fonte usada no título
    alignSelf: 'center', // Centraliza o título horizontalmente
    marginTop: 5, // Margem superior para o título
  },
  calendar: {
    borderWidth: 1, // Largura da borda ao redor do calendário
    borderColor: 'gray', // Cor da borda
    marginVertical: 5, // Margem vertical ao redor do calendário
    borderRadius: 5, // Arredonda os cantos do calendário
  },
  completedTasksTitle: {
    fontSize: 20, // Tamanho da fonte do título das tarefas
    marginTop: 20, // Margem superior para o título da lista de tarefas
    fontFamily: 'Barlow-Condensed', // Fonte usada no título
    alignSelf: 'center', // Centraliza o título horizontalmente
  },
  completedTaskItem: {
    padding: 10, // Espaçamento interno para cada tarefa
    borderBottomWidth: 1, // Linha de divisão entre as tarefas
    borderBottomColor: 'gray', // Cor da linha de divisão
  },
  taskText: {
    fontSize: 16, // Tamanho da fonte das tarefas
    fontFamily: 'Barlow-Condensed', // Fonte usada no texto das tarefas
  },
});
