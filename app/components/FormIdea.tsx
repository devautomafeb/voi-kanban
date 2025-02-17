import React, { useContext, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { IdeaContext } from '../hooks/ideaHook';
import { Idea, ideaData } from '../reducers/ideaTypes';
import { useTheme } from '../hooks/themeContext';

interface FormIdeaProps {
  visible: boolean;
  onClose: () => void;
}

export const FormIdea: React.FC<FormIdeaProps> = ({ visible, onClose }) => {
  const { addIdea } = useContext(IdeaContext);
  const { COLORS } = useTheme();  // Usando o tema corretamente

  const [idea, setIdea] = useState<ideaData>({ name: '', description: '' });

  const handleAddIdea = () => {
    if (idea.description) {
      const newIdea: Idea = {
        id: Math.round(100000 * Math.random()),
        idea,
      };

      addIdea(newIdea);
      setIdea({ name: '', description: '' });
      onClose();
      console.log(JSON.stringify(newIdea));
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
          <Text style={[styles.modalText, { color: COLORS.TEXT_PRIMARY }]}>Nova Ideia</Text>
          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Nome do futuro projeto:</Text>
          <TextInput
            placeholder="Minha idéia ..."
            style={[styles.input, { borderColor: COLORS.GRAY_MEDIUM, color: COLORS.TEXT_PRIMARY }]}
            value={idea.name}
            onChangeText={(text) => setIdea({ ...idea, name: text })}
            multiline={true}
          />

          <Text style={[styles.label, { color: COLORS.TEXT_SECONDARY }]}>Descrição:</Text>
          <TextInput
            placeholder="Esta ideia se aplica pois..."
            style={[styles.input, { borderColor: COLORS.GRAY_MEDIUM, color: COLORS.TEXT_PRIMARY }]}
            value={idea.description}
            onChangeText={(text) => setIdea({ ...idea, description: text })}
            multiline={true}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.GRAY_DARK}]}
            onPress={handleAddIdea}
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
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
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
