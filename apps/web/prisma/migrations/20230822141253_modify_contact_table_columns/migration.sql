/*
  Warnings:

  - You are about to drop the column `industry` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `linkedIn` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "industry",
DROP COLUMN "interests",
ADD COLUMN     "linkedIn" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
