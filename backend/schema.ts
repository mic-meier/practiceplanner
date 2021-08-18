import { createSchema } from '@keystone-next/keystone/schema'

import { Role, User } from './schema/users'

export const lists = createSchema({
  User,
  Role,
})
