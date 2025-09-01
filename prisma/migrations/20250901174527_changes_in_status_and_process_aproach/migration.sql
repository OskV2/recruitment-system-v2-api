/*
  Warnings:

  - You are about to drop the column `status` on the `RecruitmentStep` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'REJECTED', 'OFFER_EXTENDED', 'OFFER_ACCEPTED');

-- DropIndex
DROP INDEX "public"."RecruitmentStep_status_key";

-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ApplicationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "public"."RecruitmentStep" DROP COLUMN "status",
ADD COLUMN     "currentStep" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "roleId" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "public"."Role"("name");
