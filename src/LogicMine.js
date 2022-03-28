/**
 * Responsável pela criação do tabuleiro.
 * @param {*} rows - Número de linhas 
 * @param {*} columns - Número de colunas
 */
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_,row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
            }
        })
    })
}

/**
 * Responsável por espalhar as minas no tabuleiro;
 * @param {*} board - Tabuleiro
 * @param {*} minesAmount - Minas ativas
 */
const spreadMines = (board, minesAmount) => {
    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;
    while (minesPlanted < minesAmount) {
        //Gerar (linha e coluna) um número aleatório em formato inteiro, base 10.
        const rowSelected = parseInt(Math.random() * rows, 10);
        const columnSelected = parseInt(Math.random() * columns, 10);
        if (!board[rowSelected][columnSelected].mined) {
            board[rowSelected][columnSelected].mined = true;
            minesPlanted++;
        }
    }
}

/**
 * Responsável pela criação do tabuleiro com as minas plantadas.
 * @param {*} rows - Número de linhas do tabuleiro
 * @param {*} columns - Número de colunas do tabuleiro
 * @param {*} minesAmount - Número de minas que devem ser plantadas
 */
const createMineBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
}

/**
 * Responsável pelo clone de um tabuleiro 
 * @param {*} board - Tabuleiro a ser clonado.
 * @returns 
 */
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field};
        });
    });
}
/**
 * Responsável por verificar os vizinhos de uma linha e coluna.
 * @param {*} board - Tabuleiro
 * @param {*} row - Linha
 * @param {*} column - Coluna
 * @returns 
 */
const getNeighbors = (board, row, column) => {
    const neighbors = [];
    const rowsNeighbords = [row - 1, row, row + 1];
    const columnsNeighbords = [column - 1, column, column + 1];
    rowsNeighbords.forEach(r => {
        columnsNeighbords.forEach(c => {
            const diferent = r !== row || c !== column;
            const validRow = r >= 0 && r < board.length;
            const validColumn = c >= 0 && c < board[0].length;
            if (diferent && validRow && validColumn)
                neighbors.push(board[r][c]);
        });
    });
    return neighbors;
}
/**
 * Responsável por verificar se os vizinhos são seguros.
 * @param {*} board - Tabuleiro
 * @param {*} row - Linha
 * @param {*} column - Coluna
 */
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => (result && !neighbor.mined);
    return getNeighbors(board, row, column).reduce(safes, true);
}

/**
 * Responsável por abrir o campo e seus vizinhos se estiver seguro.
 * @param {*} board - Tabuleiro
 * @param {*} row - Linha
 * @param {*} column - Coluna
 */
const openField = (board, row, column) => {
    const field = board[row][column];
    if (!field.opened) {
        field.opened = true;
        if (field.mined) {
            field.exploded = true;
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column));
        } else {
            const neighbors = getNeighbors(board, row, column);
            field.nearMines = neighbors.filter(n => n.mined).length;
        }
    }
}

/**
 * Recupera um array único dos campos para facilitar a verificação.
 * @param {*} board - Tabuleiro
 * @returns 
 */
const fields = board => [].concat(...board);

/**
 * Verificar se existe algum campo explodido.
 * @param {*} board - Tabuleiro
 * @returns 
 */
const hadExplosion = board => fields(board)
    .filter(f => f.exploded).length > 0;
/**
 * Verifica se possuem campos "flagados" ou "fechados";
 * @param {*} field - Campo
 * @returns 
 */
const fieldPendding = field => 
    (field.mined && !field.flagged)
        || (!field.mined && !field.opened);

/**
 * Verifica se o Jogo terminou com o usuário Ganhou o Jogo!
 * @param {*} board - Tabuleiro
 * @returns 
 */
const wonGame = board => fields(board).filter(fieldPendding).length === 0;

/**
 * Abrir todos os campos que estão minados.
 * @param {*} board - Tabuleiro
 * @returns 
 */
const showMines = board => fields(board)
    .filter(field => field.mined)
        .forEach(field => field.opened = true);
/**
 * Responsavel por ativar e desativar a bandeira no tabuleiro.
 * @param {*} board - Tabuleiro
 * @param {*} row - Linha
 * @param {*} column - Coluna
 */
const invertFlag = (board, row, column) => {
    const field = board[row][column];
    field.flagged = !field.flagged;
}

/**
 * Responsavel por contar os flags marcados no tabuleiro.
 * @param {*} board - Tabuleiro
 * @returns 
 */
const flagsUsed = board => 
    fields(board).filter(field => field.flagged).length;

/**
 * Expor todos as funções para serem usadas pela aplicação.
 */
export { 
    createMineBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
 };