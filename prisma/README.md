Remember it for the future
1. Create schema with one basic model
2. Run npx prisma migrate dev --name init command
3. Do some changes in the schema 
4. Do not run npx prisma db push command, just use npx prisma migrate dev --name and some message after flag
5. Changes that were done between 2 db versions will be saved in a /prisma/migrations dir so prisma literally creates version control for dbs
6. After succesfull migration, seed can be used by running command npx prisma db seed - this will run script from /prisma/seed.ts that should insert some default data into the tables so its basically an automation feature