/*
  Warnings:

  - You are about to drop the column `locationDetails` on the `Location` table. All the data in the column will be lost.
  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Location" DROP COLUMN "locationDetails",
ADD COLUMN     "city" TEXT NOT NULL;
