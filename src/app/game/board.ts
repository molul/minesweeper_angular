import { Cell } from './cell';

// Count mines
const PEERS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export class Board {
  cells: Cell[][] = [];
  private remainingCells = 0;
  public mineCount = 0;

  constructor(size: number) {
    // Create grid
    for (let y = 0; y < size; y++) {
      this.cells[y] = [];
      for (let x = 0; x < size; x++) {
        this.cells[y][x] = new Cell(y, x);
      }
    }
  }

  //------------------------
  // Methods:
  //------------------------

  fillBoard(row: number, col: number, size: number, mines: number) {
    // Assign mines
    let minesCount = 0;
    while (minesCount < mines) {
      //console.log(minesCount)
      const y = Math.floor(Math.random() * this.cells.length);
      const x = Math.floor(Math.random() * this.cells[y].length);
      if (y !== row && x !== col) {
        this.cells[y][x].mine = true;
        minesCount++;
        //console.log(minesCount, mines)
      }
    }

    // Calculate adjacent mines to all cells
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let adjacentMines = 0;
        for (const peer of PEERS) {
          if (
            this.cells[y + peer[0]] &&
            this.cells[y + peer[0]][x + peer[1]] &&
            this.cells[y + peer[0]][x + peer[1]].mine
          ) {
            adjacentMines++;
          }
        }
        this.cells[y][x].proximityMines = adjacentMines;

        if (this.cells[y][x].mine) {
          this.mineCount++;
        }
      }
    }

    this.remainingCells = size * size - this.mineCount;
  }

  getRandomCell(): Cell {
    const y = Math.floor(Math.random() * this.cells.length);
    const x = Math.floor(Math.random() * this.cells[y].length);

    return this.cells[y][x];
  }

  checkCell(cell: Cell): 'gameover' | 'win' | null {
    if (cell.status !== 'open') {
      return null;
    } else if (cell.mine) {
      this.revealAll();
      return 'gameover';
    } else {
      cell.status = 'clear';

      if (cell.proximityMines === 0) {
        for (const peer of PEERS) {
          if (this.cells[cell.row + peer[0]] && this.cells[cell.row + peer[0]][cell.col + peer[1]]) {
            this.checkCell(this.cells[cell.row + peer[0]][cell.col + peer[1]]);
          }
        }
      }

      if (this.remainingCells-- <= 1) {
        return 'win';
      }
      return null;
    }
  }

  revealAll() {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.status === 'open') {
          cell.status = 'clear';
        }
      }
    }
  }
}
