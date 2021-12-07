import { Event } from "src/events/schemas/event.schema";
import { Program } from "src/programs/schemas/program.schema";
import { User } from "src/users/schemas/user.schema";

export class MakeDonationDto {
  amount: number;
  user: User;
  event?: Event;
}