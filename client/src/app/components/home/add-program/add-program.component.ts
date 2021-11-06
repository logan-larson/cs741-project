import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Program } from 'src/app/models/Program';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {

  dateStart: Date = new Date();
  dateEnd: Date = new Date();

  currentDate: string = "";

  @Input() name: string = "";
  @Input() description: string = "";
  @Input() dateStartString: string = "";
  @Input() dateEndString: string = "";

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private programsService: ProgramsService) { }

  ngOnInit(): void {

    this.dateEnd.setDate(this.dateStart.getDate() + 1);
    this.currentDate = this.parseDate(this.dateStart);

    this.dateStartString = this.parseDate(this.dateStart);
    this.dateEndString = this.parseDate(this.dateEnd);
                                  
  }

  parseDate(date: Date): string {
    let day: number = date.getDate();
    let month: number = date.getMonth()+1;
    let year: number = date.getFullYear();

    return `${this.addZeroes(year.toString())}-${this.addZeroes(month.toString())}-${this.addZeroes(day.toString())}`;
  }

  addZeroes(str: string): string {
    let ret: string = str;
    if (ret.length == 1) {
        ret = "0" + ret;
    }
    return ret;
  }

  addProgram() {

    let inputtedStartDate: Date = new Date(Date.parse(this.dateStartString));
    let inputtedEndDate: Date = new Date(Date.parse(this.dateEndString));

    // Validation checks
    if (!this.name) {
      alert("Program name is required");
      return;
    }

    if (this.dateEnd < this.dateStart) {
      alert("Start Date must be before End Date");
    }

    // Assemble Program

    let program: Program = {
      name: this.name,
      description: this.description,
      dateStart: inputtedStartDate,
      dateEnd: inputtedEndDate,
    }

    this.programsService.createProgram(program, (program: Program) => {
      if (program) {
        this.close.emit("close me");
      }
    })
  }

  cancel() {
    this.close.emit("close me");
  }
  

}
