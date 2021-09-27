export interface PracticeRoutine {
  id: string
  name: string
  description: string | null
  notes: string | null
  createdAt: string
  updatedAt: string | null
  exercisesCount: number
}

type RoutineCardProps = {
  routine: PracticeRoutine
}

export const RoutineCard = ({ routine }: RoutineCardProps) => {
  return (
    <div className="shadow-sm bg-blue-400 p-4 m-4">
      <div>{routine.id}</div>
      <div>{routine.name}</div>
      <div>{routine.description}</div>
      <div>{routine.notes}</div>
    </div>
  )
}

export default RoutineCard
