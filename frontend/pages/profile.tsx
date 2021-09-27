import RoutineCard, { PracticeRoutine } from '@frontend/components/RoutineCard'
import { useAuthenticatedUser } from '@frontend/hooks/useAuthenticatedUser'
import { useRoutines } from '@frontend/hooks/useRoutines'

const Profile = () => {
  const { data: user, isLoading, isError } = useAuthenticatedUser()
  const { data: routines } = useRoutines()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>Hello {user.name} !</h1>
      {routines.map((routine: PracticeRoutine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  )
}

export default Profile
