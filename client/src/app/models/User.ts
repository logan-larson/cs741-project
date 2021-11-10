export interface User {
  userId?: string,
  username?: string,
  password?: string,
  type?: string,
  registrationIds?: string[],
  donationIds?: string[]
}