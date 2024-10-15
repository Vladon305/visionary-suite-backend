-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'BACKLOG');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'BACKLOG',
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
