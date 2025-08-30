/*
  Warnings:

  - You are about to drop the column `interviewDate` on the `RecruitmentStep` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "status",
ADD COLUMN     "status" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."RecruitmentStep" DROP COLUMN "interviewDate";
