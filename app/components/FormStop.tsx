import React, { useContext, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StopContext } from '../hooks/stopHook';
import { Stop, stopData } from '../reducers/stopTypes';
import { useTheme } from '../hooks/themeContext';

interface FormStopProps {
  visible: boolean;
  onClose: () => void;
}

export const FormStop: React.FC<FormStopProps> = ({ visible, onClose }) => {
  const { addStop } = useContext(StopContext);
  const { COLORS } = useTheme();

  const [stop, setStop] = useState<stopData>({ name: '', description: '' });

  const handleAddStop = () => {
    if (stop.description) {
      const newStop: Stop = {
        id: Math.round(100000 * Math.random()),
        stop,
      };

      addStop(newStop);
      setStop({ name: '', description: '' });
      onClose();
      console.log(JSON.stringify(newStop));
    }
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
          <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Nova Proibição</Text>
          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Não devo:</Text>
          <TextInput
            placeholder="Devo não..."
            style={[styles.input, { borderColor: COLORS.GRAY_MEDIUM, color: COLORS.TEXT_PRIMARY }]}
            value={stop.name}
            onChangeText={(text) => setStop({ ...stop, name: text })}
            multiline={true}
          />

          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Me atrapalha em:</Text>
          <TextInput
            placeholder="Esta proibição se aplica pois..."
            style={[styles.input, { borderColor: COLORS.GRAY_MEDIUM, color: COLORS.TEXT_PRIMARY }]}
            value={stop.description}
            onChangeText={(text) => setStop({ ...stop, description: text })}
            multiline={true}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.GRAY_DARK }]}
            onPress={handleAddStop}
          >
            <Text style={[styles.buttonText, { color: COLORS.TEXT_LIGHT }]}>Adicionar</Text>
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
    padding: 10,
    fontSize:20,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontFamily: 'Barlow-Condensed',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    fontSize:20,
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
