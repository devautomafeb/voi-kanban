import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

import { useTheme } from '../hooks/themeContext'; // Importa o hook useTheme

dayjs.locale('pt-br'); // Define o dayjs para usar a localidade em português

interface CalendarProps {
  onChange: (date: Date) => void;
  mode: 'date' | 'time' | 'datetime';
  isVisible: boolean;
  onClose: () => void;
}


export const Calendar: React.FC<CalendarProps> = ({ 
  onChange, 
  mode = 'date', // Parâmetro padrão
  isVisible = false, // Parâmetro padrão
  onClose = () => {} // Parâmetro padrão
}) => {
  const theme = useTheme();

  const handleConfirm = (date: Date) => {
    onChange(date);
    onClose();
  };

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={onClose}
      locale="pt_BR"
      confirmTextIOS="Confirmar"
      cancelTextIOS="Cancelar"
      textColor={theme.COLORS.PRIMARY}
      buttonTextColorIOS={theme.COLORS.PRIMARY}
    />
  );
};
