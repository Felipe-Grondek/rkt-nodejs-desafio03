/*
  Warnings:

  - The `number` column on the `orgs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER;
