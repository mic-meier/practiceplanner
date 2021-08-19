import { checkbox, password, relationship, text } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'

export const User = list({
  fields: {
    name: text(),
    email: text({ isUnique: true }),
    password: password(),
    role: relationship({ ref: 'Role.users' }),
    exercises: relationship({
      ref: 'Exercise.user',
      many: true,
      ui: {
        displayMode: 'select',
      },
    }),
    routines: relationship({
      ref: 'Routine.user',
      many: true,
      ui: {
        displayMode: 'select',
      },
    }),
  },
})

export const Role = list({
  fields: {
    name: text(),
    canManageContent: checkbox({ defaultValue: false }),
    canManageUsers: checkbox({ defaultValue: false }),
    users: relationship({ ref: 'User.role', many: true }),
  },
})
