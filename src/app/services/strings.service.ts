import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringsService {

  constructor() { }

  public readonly generatorTitle: string = "Generate South African ID";
}
