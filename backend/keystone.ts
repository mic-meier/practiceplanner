import { createAuth } from '@keystone-next/auth'
import { config } from '@keystone-next/keystone/schema'
import { statelessSessions } from '@keystone-next/keystone/session'

import { lists } from './schema'
import { rules } from './schema/access'

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres://${process.env.USER}@localhost/practiceplanner`

const sessionSecret =
  process.env.SESSION_SECRET || ';sjfher;gjnwelrghoiubergjwnerpigherg'

const auth = createAuth({
  identityField: 'email',
  secretField: 'password',
  listKey: 'User',
  sessionData: `id name role {
      canManageContent
      canManageUsers
    }`,
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: {
      role: {
        create: {
          name: 'Super User',
          canManageContent: true,
          canManageUsers: true,
        },
      },
    },
  },
})

export default auth.withAuth(
  config({
    db: {
      url: dbUrl,
      provider: 'postgresql',
      useMigrations: true,
    },
    ui: { isAccessAllowed: rules.canUseAdminUI },
    session: statelessSessions({
      secret: sessionSecret,
    }),
    lists,
    server: {
      port: 3001,
      cors: { origin: ['http://localhost:3000'], credentials: true },
    },
  })
)
