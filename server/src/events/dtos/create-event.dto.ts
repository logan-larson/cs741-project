export class CreateEventDto {
  name: string;
  description: string;
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  volunteersNeeded: number;
  isIndependent: boolean;
}