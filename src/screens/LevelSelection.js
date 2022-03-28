import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, Modal} from "react-native";

export default props => {
    return (
        <Modal onRequestClose={props.onCancelModal}
            visible={props.isVisibleModal}
            animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.frameModal}>
                    <Text style={styles.titleModal}>Nível do Jogo</Text>
                    <TouchableOpacity style={[styles.levelButton, styles.bgEasy]}
                        onPress={() => props.onLevelSelected(0.1)}>
                            <Text style={styles.labelLevelButton}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.levelButton, styles.bgNormal]}
                        onPress={() => props.onLevelSelected(0.2)}>
                            <Text style={styles.labelLevelButton}>Intermediário</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.levelButton, styles.bgHard]}
                        onPress={() => props.onLevelSelected(0.3)}>
                            <Text style={styles.labelLevelButton}>Difícil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',        
    },
    frameModal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: 15
    },
    titleModal: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    levelButton: {
        marginTop: 10,
        padding: 5
    },
    labelLevelButton: {
        fontSize: 20,
        color: '#eee',
        fontWeight: 'bold'
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgNormal: {
        backgroundColor: '#2765f7'
    },
    bgHard: {
        backgroundColor: '#f26337'
    }
});