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
  status: 'playing' | 'win' | 'lose'

  constructor() {
    this.reset();
  }

  reset() {
    this.board = new Board(9, 10);
    this.status = 'playing';
  }

  checkCell(cell: Cell) {
    const result = this.board.checkCell(cell);
    if (result === 'gameover') {
      this.status = 'lose'
    } else if (result === 'win') {
      this.status = 'win';
    }
  }

  flag (cell: Cell) {
    if (this.status !== 'win' && this.status !== 'lose') {
      if (cell.status !== 'clear') {
        if (cell.status === 'flag') {
          cell.status = 'open';
        } else {
          cell.status = 'flag';
        }
      }
    }
  }

}
