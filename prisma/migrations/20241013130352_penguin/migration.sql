-- CreateTable
CREATE TABLE "Penguin" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'happy',
    "hungerLevel" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "lastTaskCompleted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastInteracted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Penguin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Penguin_userId_key" ON "Penguin"("userId");

-- AddForeignKey
ALTER TABLE "Penguin" ADD CONSTRAINT "Penguin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
