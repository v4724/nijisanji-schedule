import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnchorPointService {

  count = 1
  constructor() { }

  getIndex(): number {
    this.count += 1
    return this.count
  }
}
