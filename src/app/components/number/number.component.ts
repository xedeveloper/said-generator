import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  @Output() onTap: EventEmitter<void> = new EventEmitter<void>();


  public handleOnClickEvent($event: unknown): void {
    this.onTap.emit();
  }
}
