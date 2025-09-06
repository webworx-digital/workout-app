/*
  Warnings:

  - You are about to drop the `WorkoutTemplates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `setTemplate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ExerciseTemplate" DROP CONSTRAINT "ExerciseTemplate_workoutTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkoutTemplates" DROP CONSTRAINT "WorkoutTemplates_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."set" DROP CONSTRAINT "set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."setTemplate" DROP CONSTRAINT "setTemplate_exerciseTemplateId_fkey";

-- AlterTable
ALTER TABLE "public"."Workout" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "templateId" INTEGER;

-- DropTable
DROP TABLE "public"."WorkoutTemplates";

-- DropTable
DROP TABLE "public"."set";

-- DropTable
DROP TABLE "public"."setTemplate";

-- CreateTable
CREATE TABLE "public"."Set" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkoutTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SetTemplate" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "exerciseTemplateId" INTEGER NOT NULL,

    CONSTRAINT "SetTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Workout" ADD CONSTRAINT "Workout_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."WorkoutTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkoutTemplate" ADD CONSTRAINT "WorkoutTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExerciseTemplate" ADD CONSTRAINT "ExerciseTemplate_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "public"."WorkoutTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SetTemplate" ADD CONSTRAINT "SetTemplate_exerciseTemplateId_fkey" FOREIGN KEY ("exerciseTemplateId") REFERENCES "public"."ExerciseTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
