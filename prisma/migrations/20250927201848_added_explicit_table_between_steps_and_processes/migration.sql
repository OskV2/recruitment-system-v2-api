/*
  Warnings:

  - You are about to drop the `_RecruitmentProcessToRecruitmentStep` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_RecruitmentProcessToRecruitmentStep" DROP CONSTRAINT "_RecruitmentProcessToRecruitmentStep_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RecruitmentProcessToRecruitmentStep" DROP CONSTRAINT "_RecruitmentProcessToRecruitmentStep_B_fkey";

-- DropTable
DROP TABLE "public"."_RecruitmentProcessToRecruitmentStep";

-- CreateTable
CREATE TABLE "public"."ProcessStep" (
    "processId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProcessStep_pkey" PRIMARY KEY ("processId","stepId")
);

-- AddForeignKey
ALTER TABLE "public"."ProcessStep" ADD CONSTRAINT "ProcessStep_processId_fkey" FOREIGN KEY ("processId") REFERENCES "public"."RecruitmentProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProcessStep" ADD CONSTRAINT "ProcessStep_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "public"."RecruitmentStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
