export interface User {
  userId?: string,
  username?: string,
  password?: string,
  type?: string,
  activeRegistrationIds?: string[],
  inactiveRegistrationIds?: string[],
  donationIds?: string[]
}