-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "countryName" TEXT NOT NULL,
    "waterQuality" INTEGER NOT NULL,
    "waterComsumption" INTEGER NOT NULL,
    "userScore" INTEGER NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Continent" (
    "id" SERIAL NOT NULL,
    "continentName" TEXT NOT NULL,
    "waterQuality" INTEGER NOT NULL,
    "waterComsumption" INTEGER NOT NULL,
    "userScore" INTEGER NOT NULL,

    CONSTRAINT "Continent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "water_vote" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
