import { relationship, text, timestamp } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'

export const Routine = list({
  ui: {
    listView: {
      initialColumns: ['name', 'user'],
    },
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    notes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    createdAt: timestamp({
      defaultValue: () => new Date().toUTCString(),
    }),
    updatedAt: timestamp(),
    user: relationship({ ref: 'User.routines' }),
    exercises: relationship({ ref: 'Exercise.routines', many: true }),
  },
})
