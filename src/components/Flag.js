import React from 'react';
import { StyleSheet, View } from 'react-native';
import params from '../Params';
export default props => {
    
    const styleFlag = [styles.flag];
    if (props.bigger)
        styleFlag.push(styles.flagBigger);
    if (params.difficultLevel === 0.1)
        styleFlag.push(styles.bgEasy);
    else if (params.difficultLevel === 0.2)
        styleFlag.push(styles.bgNormal);
    else if (params.difficultLevel === 0.3)
        styleFlag.push(styles.bgHard);

    return (
        <View style={styles.container}>
            <View style={[styles.flagpole, props.bigger ? styles.flagpoleBigger : null]}/>
            <View style={styleFlag}/>
            <View style={[styles.base1, props.bigger ? styles.base1Bigger : null]}/>
            <View style={[styles.base2, props.bigger ? styles.base2Bigger : null]}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 2
    },
    flagpole: {
        position: 'absolute',
        height: 14,
        width: 2,
        backgroundColor: '#222',
        marginLeft: 9,
    },
    flag: {
        position: 'absolute',
        height: 5,
        width: 6,
        backgroundColor: '#f22',
        marginLeft: 3,
    },
    base1: {
        position: 'absolute',
        height: 2,
        width: 6,
        backgroundColor: '#222',
        marginLeft: 7,
        marginTop: 10
    },
    base1: {
        position: 'absolute',
        height: 2,
        width: 10,
        backgroundColor: '#222',
        marginLeft: 5,
        marginTop: 12
    },
    flagpoleBigger: {
        position: 'absolute',
        height: 28,
        width: 4,
        marginLeft: 16,
    },
    flagBigger: {
        position: 'absolute',
        height: 10,
        width: 14,
        marginLeft: 3,
    },
    base1Bigger: {
        position: 'absolute',
        height: 4,
        width: 12,
        marginLeft: 20,
        marginTop: 12
    },
    base1Bigger: {
        position: 'absolute',
        height: 4,
        width: 20,
        marginLeft: 8,
        marginTop: 24
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
})