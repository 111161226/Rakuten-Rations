/*
  Warnings:

  - You are about to drop the column `woman_ration` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `woman_ratio` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "woman_ration",
ADD COLUMN     "woman_ratio" INTEGER NOT NULL;
