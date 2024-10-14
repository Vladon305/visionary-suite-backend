/*
  Warnings:

  - The `state` column on the `Penguin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PenguinState" AS ENUM ('HAPPY', 'ANGRY', 'FRUFOWED', 'SAD', 'VERY_SAD', 'MONSTER');

-- AlterTable
ALTER TABLE "Penguin" DROP COLUMN "state",
ADD COLUMN     "state" "PenguinState" NOT NULL DEFAULT 'HAPPY';
