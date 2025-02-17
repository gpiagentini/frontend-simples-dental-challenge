import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridColumnService {

  constructor() { }

  public getColumnsBySize(size: number): number {
    return this.getTotalColumnsBySize(size);
  }

  private getTotalColumnsBySize(size: number): number {
    if (size < 500)
      return 1;
    if (size < 700)
      return 2;
    if (size < 1000)
      return 3;
    if (size < 1200)
      return 4;
    if (size < 1600)
      return 5;
    if (size < 2000)
      return 6;
    if (size < 3000)
      return 8;
    return 10;
  }

}
