import { hashPassword } from '../utils/hash-password';
import prisma from '../src/db';

const main = async () => {
  console.log('🌱 Seeding database...');

  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.contractType.deleteMany();
  await prisma.location.deleteMany();
  await prisma.fullTimeEquivalent.deleteMany();
  await prisma.benefit.deleteMany();

  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'Admin' },
      update: {},
      create: {
        name: 'Admin',
        description: 'Admin of whole system with all permissions',
        canManageUsers: true,
        canManageRoles: true,
        canAddNewOffer: true,
        canEditExistingOffer: true,
        canViewAllOffers: true,
        canManageJobApplications: true,
        canViewLogs: true,
      },
    }),
    prisma.role.upsert({
      where: { name: 'New user' },
      update: {},
      create: {
        name: 'New user',
        description:
          'Role that is automatically assigned to every new created user',
        canManageUsers: false,
        canManageRoles: false,
        canAddNewOffer: false,
        canEditExistingOffer: false,
        canViewAllOffers: false,
        canManageJobApplications: false,
        canViewLogs: false,
      },
    }),
  ]);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@domain.com' },
      update: {},
      create: {
        name: 'Admin user',
        email: 'admin@domain.com',
        password: await hashPassword('root'),
        role: {
          connect: { name: 'Admin' },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'new@domain.com' },
      update: {},
      create: {
        name: 'New user',
        email: 'new@domain.com',
        password: await hashPassword('root'),
        role: {
          connect: { name: 'New user' },
        },
      },
    }),
  ]);

  const contractTypes = await Promise.all([
    prisma.contractType.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Employment contract',
        description: 'Standard full-time or part-time job.',
      },
    }),
    prisma.contractType.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Independent contractor',
        description:
          'Individual that runs their own business and provides services to clients.',
      },
    }),
    prisma.contractType.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Temporary / gig contract',
        description:
          'Paid for hours worked or tasks completed, without full employee benefits',
      },
    }),
  ]);

  const locations = await Promise.all([
    prisma.location.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Los Angeles, CA',
        description: 'Office in new building',
      },
    }),
  ]);

  const fullTimeEquivalents = await Promise.all([
    prisma.fullTimeEquivalent.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: '1.0 FTE',
        description: '40 Hours / week',
      },
    }),
    prisma.fullTimeEquivalent.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: '0.5 FTE',
        description: '20 Hours / week',
      },
    }),
    prisma.fullTimeEquivalent.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: '0.25 FTE',
        description: '10 Hours / week',
      },
    }),
    prisma.fullTimeEquivalent.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Hourly contract',
        description: 'Number of hours may vary between weeks',
      },
    }),
  ]);

  const benefits = await Promise.all([
    prisma.benefit.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Private health care',
      },
    }),
    prisma.benefit.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Fridge with snacks and drinks for employees',
      },
    }),
    prisma.benefit.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Meal subsidy',
      },
    }),
  ]);

  const recruitmentSteps = await Promise.all([
    prisma.recruitmentStep.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Under review',
        description: 'Application is under review by HR department',
        requiresInterview: false,
      },
    }),
    prisma.recruitmentStep.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Reviewed',
        description:
          'Application has been reviewed by HR department and has been sent to your future supervisor',
        requiresInterview: false,
      },
    }),
    prisma.recruitmentStep.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'HR Screening',
        description: 'Screening with HR department on Teams platform',
        requiresInterview: true,
      },
    }),
    prisma.recruitmentStep.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Job Interview',
        description: 'Technical job interview with Project Manager and Development Team Leader',
        requiresInterview: true,
      },
    }),
    prisma.recruitmentStep.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: '',
        description: '',
        requiresInterview: false,
      },
    }),
  ]);
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })