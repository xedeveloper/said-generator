import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { StringsService } from './services/strings.service';
import { NumberComponent } from './components/number/number.component';
import { DropdownComponent, DropdownElement } from './components/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { SaidGeneratorService } from './services/generator/said-generator.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { injectSpeedInsights } from '@vercel/speed-insights';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TitleComponent,
    NumberComponent,
    DropdownComponent,
    FormsModule,

  ],
  providers: [
    StringsService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'said-generator';

  public days$: DropdownElement[] = Array.from({
    length: 31,
  },
    (_, i) => {
      const key: string = (i + 1).toString();
      const dayValue = new Intl.NumberFormat('en', { minimumIntegerDigits: 2, useGrouping: false }).format(i + 1);

      return { key: key, value: dayValue }
    })
  public months$: DropdownElement[] = [
    { key: "January", value: "01" },
    { key: "February", value: "02" },
    { key: "March", value: "03" },
    { key: "April", value: "04" },
    { key: "May", value: "05" },
    { key: "June", value: "06" },
    { key: "July", value: "07" },
    { key: "August", value: '08' },
    { key: "September", value: "09" },
    { key: "October", value: "10" },
    { key: "November", value: "11" },
    { key: "December", value: "12" },
  ]

  public year$: DropdownElement[] = this.generateYearList();
  public range$: string = '800';

  public saidNumber$: string = '6001015800180';

  public selectedGender$: string = "5";
  public selectedType$: string = '0';

  public selectedYear$: string = "99";
  public selectedMonth$: string = "01";
  public selectedDay$: string = "01";

  constructor(
    public strings: StringsService,
    private generator: SaidGeneratorService,
    private clipboard: Clipboard,
  ) {
    injectSpeedInsights();
  }



  private generateYearList(): DropdownElement[] {
    const values: number[] = [];
    const currentDate = new Date().getFullYear();
    for (let i = 0; i <= 99 - 20; i++) {
      values[i] = i + 20;
    }
    const mappedValues: DropdownElement[] = values.map(
      (value) => {
        const key: string = `${currentDate - value}, ${value} years old`;
        return { key: key, value: `${currentDate - value}`.substring(2) }
      }
    );
    return mappedValues ?? [];
  }

  public onCopyToClipClick($event: unknown): void {
    this.clipboard.copy(this.saidNumber$);
  }

  public onRangeChange($event: Event): void {
    const rangeSelection: string = ($event.currentTarget as HTMLInputElement).value;
    this.range$ = rangeSelection;
  }

  public onGenerateButtonClick($event: Event): void {
    this.saidNumber$ = this.generator.generateSaid({
      year: this.selectedYear$,
      month: this.selectedMonth$,
      day: this.selectedDay$,
      gender: this.selectedGender$,
      type: this.selectedType$,
      sequence: this.range$
    });
  }

  public onGenerateRandomClick($event: Event): void {
    const year: string = this.year$[this.generator.getRandomIntFromInterval(0, this.year$.length)].value;
    const month: string = this.months$[this.generator.getRandomIntFromInterval(0, this.months$.length)].value;
    const day: string = this.days$[this.generator.getRandomIntFromInterval(0, this.days$.length)].value;
    const sequence: string = this.generator.getRandomIntFromInterval(100, 999).toString();

    this.saidNumber$ = this.generator.generateSaid({
      year: year,
      month: month,
      day: day,
      gender: this.selectedGender$,
      type: this.selectedType$,
      sequence: sequence,
    });
  }

  public onYearSelection($selection: DropdownElement) {
    this.selectedYear$ = $selection.value;
  }
  public onMonthSelection($selection: DropdownElement) {
    this.selectedMonth$ = $selection.value;
  }
  public onDaySelection($selection: DropdownElement) {
    this.selectedDay$ = $selection.value;
  }

}
