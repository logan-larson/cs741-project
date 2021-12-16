import { Event } from "src/events/schemas/event.schema";
import { User } from "src/users/schemas/user.schema";

export class MakeDonationDto {
  amount: number;
  user: User;
  event?: Event;
}