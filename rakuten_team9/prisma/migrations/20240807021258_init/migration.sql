/*
  Warnings:

  - Changed the type of `expired_at` on the `Stored_food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Stored_food" DROP COLUMN "expired_at",
ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL;
