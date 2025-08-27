/*
  Warnings:

  - Made the column `requiresInterview` on table `RecruitmentStep` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."RecruitmentStep" ALTER COLUMN "requiresInterview" SET NOT NULL;
