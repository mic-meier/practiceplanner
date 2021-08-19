import { createSchema } from '@keystone-next/keystone/schema'

import { Exercise } from './schema/exercises'
import { Routine } from './schema/routines'
import { Role, User } from './schema/users'

export const lists = createSchema({
  User,
  Role,
  Routine,
  Exercise,
})
