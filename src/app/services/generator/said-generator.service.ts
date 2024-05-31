import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaidGeneratorService {

  constructor() { }

  public getRandomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public generateSaid(request: GenerateSaidRequest): string {
    const joinedDigits = `${request.year}${request.month}${request.day}${request.gender}${request.sequence}${request.type}8`;
    const digits: number[] = joinedDigits.replace(/\D/g, '').split('').map(d => Number(d))
    const checkSum = digits.reverse().map((d, ix) => {
      if (ix % 2 === 0) {
        d *= 2
        if (d > 9) {
          d -= 9
        }
      }
      return d
    }).reduce((memo, d) => memo += d, 0)

    const calculatedCheckSum = checkSum * 9 % 10;
    const idNumber = joinedDigits + calculatedCheckSum
    return idNumber;
  }
}

export interface GenerateSaidRequest {
  year: string;
  month: string;
  day: string;
  gender: string;
  type: string;
  sequence: string
}
