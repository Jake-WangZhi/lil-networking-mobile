/*
  Warnings:

  - You are about to drop the column `note` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Contact` table. All the data in the column will be lost.
  - The `interests` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `date` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Made the column `goalDays` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_contactId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "note",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "category",
DROP COLUMN "image",
DROP COLUMN "website",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "links" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "interests",
ADD COLUMN     "interests" TEXT[],
ALTER COLUMN "goalDays" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
