export interface Program {
  programId?: string,
  name?: string,
  description?: string,
  dateStart?: Date,
  dateEnd?: Date,
  eventIds?: string[],
  donationIds?: string[],
}