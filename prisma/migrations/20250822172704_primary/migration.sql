-- CreateEnum
CREATE TYPE "public"."WorkModel" AS ENUM ('OFFICE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "public"."OfferStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."LogType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'DANGER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'root',
    "roleId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "canManageUsers" BOOLEAN NOT NULL,
    "canManageRoles" BOOLEAN NOT NULL,
    "canAddNewOffer" BOOLEAN NOT NULL,
    "canEditExistingOffer" BOOLEAN NOT NULL,
    "canViewAllOffers" BOOLEAN NOT NULL,
    "canManageJobApplications" BOOLEAN NOT NULL,
    "canViewLogs" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobOffer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInformation" TEXT,
    "salary" TEXT NOT NULL,
    "workModel" "public"."WorkModel" NOT NULL,
    "mustHaveRequirements" TEXT[],
    "niceToSeeRequirements" TEXT[],
    "published" BOOLEAN NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "offerStatus" "public"."OfferStatus" NOT NULL,
    "contractTypeId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "fullTimeEquivalentId" INTEGER NOT NULL,
    "recruitmentProcessId" INTEGER NOT NULL,
    "recruiterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContractType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FullTimeEquivalent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FullTimeEquivalent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Benefit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecruitmentProcess" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruitmentProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecruitmentStep" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "requiresInterview" BOOLEAN,
    "interviewDate" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruitmentStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "githubLink" TEXT,
    "status" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "jobOfferId" INTEGER NOT NULL,
    "recruitmentProcessId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attachment" (
    "id" SERIAL NOT NULL,
    "originalName" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "isCV" BOOLEAN NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Log" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "type" "public"."LogType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_BenefitToJobOffer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BenefitToJobOffer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_RecruitmentProcessToRecruitmentStep" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RecruitmentProcessToRecruitmentStep_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RecruitmentStep_status_key" ON "public"."RecruitmentStep"("status");

-- CreateIndex
CREATE INDEX "_BenefitToJobOffer_B_index" ON "public"."_BenefitToJobOffer"("B");

-- CreateIndex
CREATE INDEX "_RecruitmentProcessToRecruitmentStep_B_index" ON "public"."_RecruitmentProcessToRecruitmentStep"("B");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobOffer" ADD CONSTRAINT "JobOffer_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "public"."ContractType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobOffer" ADD CONSTRAINT "JobOffer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobOffer" ADD CONSTRAINT "JobOffer_fullTimeEquivalentId_fkey" FOREIGN KEY ("fullTimeEquivalentId") REFERENCES "public"."FullTimeEquivalent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobOffer" ADD CONSTRAINT "JobOffer_recruitmentProcessId_fkey" FOREIGN KEY ("recruitmentProcessId") REFERENCES "public"."RecruitmentProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobOffer" ADD CONSTRAINT "JobOffer_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "public"."JobOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_recruitmentProcessId_fkey" FOREIGN KEY ("recruitmentProcessId") REFERENCES "public"."RecruitmentProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attachment" ADD CONSTRAINT "Attachment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BenefitToJobOffer" ADD CONSTRAINT "_BenefitToJobOffer_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BenefitToJobOffer" ADD CONSTRAINT "_BenefitToJobOffer_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RecruitmentProcessToRecruitmentStep" ADD CONSTRAINT "_RecruitmentProcessToRecruitmentStep_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."RecruitmentProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RecruitmentProcessToRecruitmentStep" ADD CONSTRAINT "_RecruitmentProcessToRecruitmentStep_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."RecruitmentStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
