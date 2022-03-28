import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/Params';
import MineField from './src/components/MineField';
import { 
  createMineBoard, 
  cloneBoard,
  openField,
  hadExplosion,
  showMines, 
  wonGame,
  invertFlag,
  flagsUsed
} from './src/LogicMine';
import MineHeader from './src/components/MineHeader';
import ModalLevelSelection from './src/screens/LevelSelection';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMineBoard(rows, cols, this.minesAmount()),
      wonGame: false,
      lostGame: false,
      showModalLevelSelection: false,
    }
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    //% de dificuldade do jogo.
    return Math.ceil((cols * rows) * params.difficultLevel);
  }

  alertWonGame = () => {
    Alert.alert("Jogo", "Você venceu!");
  }
  alertLostGame = () => {
    Alert.alert("Gameover", "Que burrro! Você perdeu!!!!!");
  }

  onOpenField = (row, column) => {
    
    //Clonar o estado, importante...
    const board = cloneBoard(this.state.board);
    openField(board, row, column);

    const lost = hadExplosion(board);
    const won = wonGame(board);
    
    if (lost) {
      showMines(board);
      this.alertLostGame();
    }
    if (won) {
      this.alertWonGame();
    }

    this.setState( {board, lostGame: lost, wonGame: won});

  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    
    const won = wonGame(board);
    if (won) {
      this.alertWonGame();
    }
    
    //Ajusta o estado do compomente
    this.setState( {board, wonGame: won});

  }

  onLevelSelected = level => {
    params.difficultLevel = level;
    this.setState(this.createState());
  }

  render() {
    return (
      <SafeAreaView styles={styles.container}>
        <ModalLevelSelection isVisibleModal={this.state.showModalLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancelModal={() => this.setState({ showModalLevelSelection: false })}/>
        <MineHeader flagLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onFlagPress={() => this.setState({ showModalLevelSelection: true })} 
          onResetGame={() => this.setState(this.createState())}/>
        <View style={styles.board}>
          <MineField board={this.state.board} 
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}/>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titulo: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});
