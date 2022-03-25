import { Dimensions } from "react-native";
const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, //Proporção do painel superior na tela.
    difficultLevel: 0.1, //Nível de dificuldade (0.1=Facil, 0.2=Medio, 0.3=Dificil)
    getColumnsAmount() {
        const width = Dimensions.get("window").width;
        return Math.floor(width / this.blockSize);
    },
    getRowsAmount() {
        const heigth = Dimensions.get("window").height;
        const boardHeigth = heigth * (1 - this.headerRatio);
        return Math.floor(boardHeigth / this.blockSize);
    }
}
export default params;