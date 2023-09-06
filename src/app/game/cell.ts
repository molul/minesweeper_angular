export class Cell {
  status: 'open' | 'clear' | 'mine' | 'flag' = 'open';
  mine = false;
  proximityMines = 0;

  constructor(public row: number, public col: number) {

  }
}
