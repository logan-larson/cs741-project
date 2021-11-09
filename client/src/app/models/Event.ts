export interface Event {
  eventId?: string,
  name?: string,
  description?: string,
  date?: Date,
  timeStart?: Date,
  timeEnd?: Date,
  volunteerCountRequirement?: number,
  volunteerUserIds?: string[],
  registrationIds?: string[],
  donationIds?: string[],
  isIndependent?: boolean,
}