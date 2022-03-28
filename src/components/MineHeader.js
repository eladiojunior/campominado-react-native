import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import params from "../Params";
import Flag from "./Flag";

export default props => {
    
    let textLevelSelected = "Fácil";
    if (params.difficultLevel === 0.1)
        textLevelSelected = "Fácil";
    else if (params.difficultLevel === 0.2)
        textLevelSelected = "Intermediário";
    else if (params.difficultLevel === 0.3)
        textLevelSelected = "Difícil";

    return (
        <View style={styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress}
                    style={styles.flagButton}>
                    <Flag bigger={true}/>
                </TouchableOpacity>
                <Text style={styles.flagText}>= {props.flagLeft}</Text>
            </View>
            <Text style={styles.levelSelect}>Nível: {textLevelSelected}</Text>
            <TouchableOpacity onPress={props.onResetGame}
                    style={styles.resetButton}>
                <Text style={styles.resetButtonLabel}>Novo Jogo</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    flagContainer: {
        flexDirection: 'row',
    },
    flagButton: {
        marginTop: 10,
        minWidth: 30
    },
    flagText: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
    },
    resetButton: {
        backgroundColor: '#999',
        padding: 5
    },
    resetButtonLabel: {
        fontSize: 20,
        color: '#ddd',
        fontWeight: 'bold'
    },
    levelSelect: {
        textAlign: 'center',
        minWidth: 120,
        fontWeight: 'bold'
    }
});