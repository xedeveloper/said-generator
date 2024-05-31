import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() options: DropdownElement[] = [];
  @Input() selectedValue: string | null = null;
  @Output() onSelection: EventEmitter<DropdownElement> = new EventEmitter<DropdownElement>();
  @ViewChild('dropdownContent', { static: true }) dropdownContent?: ElementRef;


  public onOptionChange(value: DropdownElement) {
    this.placeholder = value.key;
    this.selectedValue = value.value;
    this.onSelection.emit(value);
  }
}


export interface DropdownElement {
  key: string;
  value: string
}