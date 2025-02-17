import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from '../hooks/themeContext'; // Importando o useTheme

export function ButtonAdd(props: any) {
    const theme = useTheme(); // Usando o hook useTheme

    return (
        <View style={styles.separator}>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#333'}]} 
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        textAlign:'center',
        width:'92%',
        margin:10,
    },
    button: {
        borderColor:'#cf4',
        borderWidth:1,
        borderRadius: 30,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Barlow-Condensed',
    },
});
