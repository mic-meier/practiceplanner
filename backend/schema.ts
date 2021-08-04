import { checkbox, password, relationship, text } from '@keystone-next/fields'
import { createSchema, list } from '@keystone-next/keystone/schema'

export const lists = createSchema({
  User: list({
    fields: {
      name: text(),
      email: text({ isUnique: true }),
      password: password(),
      role: relationship({ ref: 'Role.users' }),
    },
  }),
  Role: list({
    fields: {
      name: text(),
      canManageContent: checkbox({ defaultValue: false }),
      canManageUsers: checkbox({ defaultValue: false }),
      users: relationship({ ref: 'User.role', many: true }),
    },
  }),
})
