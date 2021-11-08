export interface Event {
  eventId?: string,
  name?: string,
  description?: string,
  date?: Date,
  timeStart?: Date,
  timeEnd?: Date,
  volunteersNeeded?: number,
  volunteerUserIds?: string[],
  registrationIds?: string[],
  donationIds?: string[],
  isIndependent?: boolean,
}