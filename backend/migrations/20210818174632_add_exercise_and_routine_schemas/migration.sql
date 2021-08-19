-- CreateEnum
CREATE TYPE "ExerciseCategoryType" AS ENUM ('technique', 'theory', 'earTraining', 'repertoire');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "category" "ExerciseCategoryType",
    "duration" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "user" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "user" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Exercise_routines_Routine_exercises" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise.name_unique" ON "Exercise"("name");

-- CreateIndex
CREATE INDEX "Exercise.user_index" ON "Exercise"("user");

-- CreateIndex
CREATE INDEX "Routine.user_index" ON "Routine"("user");

-- CreateIndex
CREATE UNIQUE INDEX "_Exercise_routines_Routine_exercises_AB_unique" ON "_Exercise_routines_Routine_exercises"("A", "B");

-- CreateIndex
CREATE INDEX "_Exercise_routines_Routine_exercises_B_index" ON "_Exercise_routines_Routine_exercises"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Exercise_routines_Routine_exercises" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Exercise_routines_Routine_exercises" ADD FOREIGN KEY ("B") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
