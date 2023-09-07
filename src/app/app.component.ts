import { Component } from '@angular/core';
import { Board } from './game/board'
import { Cell } from './game/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minesweeper';
  board: Board;
  status: 'firstClick' | 'playing' | 'win' | 'lose'
  size = 9;
  mines = 10;
  flaggedMines = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.board = new Board(this.size);
    this.status = 'firstClick';
    this.flaggedMines = 0;
  }

  checkCell(cell: Cell) {
    // Add mines after first click, to ensure you don't lose on first click
    if (this.status === 'firstClick') {
      this.status = 'playing';
      this.board.fillBoard(cell.row, cell.col, this.size, this.mines);
    }

    // If game is not over, check clicked cell
    if (this.status !== 'win' && this.status !== 'lose') {
      const result = this.board.checkCell(cell);
      if (result === 'gameover') {
        this.status = 'lose'
      } else if (result === 'win') {
        this.status = 'win';
      }
    }
  }


  flag (cell: Cell) {
    if (this.status !== 'win' && this.status !== 'lose') {
      if (cell.status !== 'clear') {
        if (cell.status === 'flag') {
          cell.status = 'open';
          this.flaggedMines--;
        } else {
          if (this.flaggedMines < this.mines) {
            cell.status = 'flag';
            this.flaggedMines++;
          }
        }
      }
    }
  }

}
