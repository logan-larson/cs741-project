import { Component, Input, OnInit } from '@angular/core';
import { Program } from 'src/app/models/Program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  @Input() program: Program = {};
  dateStart: string = "";
  dateEnd: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.program) {
      if (this.program.dateStart) {
        this.dateStart = new Date(this.program.dateStart).toLocaleDateString();
      }
      if (this.program.dateEnd) {
        this.dateEnd = new Date(this.program.dateEnd).toLocaleTimeString();
      }
    }
  }

}
