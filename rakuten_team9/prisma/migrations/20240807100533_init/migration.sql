-- AlterTable
ALTER TABLE "Stored_food" ADD COLUMN     "org_name" TEXT;

-- AddForeignKey
ALTER TABLE "Stored_food" ADD CONSTRAINT "Stored_food_org_name_fkey" FOREIGN KEY ("org_name") REFERENCES "Organization"("name") ON DELETE SET NULL ON UPDATE CASCADE;
