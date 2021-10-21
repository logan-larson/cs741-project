import { Time } from "@angular/common";

export interface Event {
  name?: string,
  description?: string,
  date?: Date,
  time?: Time,
  location?: string,
  volunteersNeeded?: number,
}