import { Event } from "src/events/schemas/event.schema";
import { User } from "src/users/schemas/user.schema";

export class ChangeActivationRegistrationDto {
  user: User;
  event: Event;
}