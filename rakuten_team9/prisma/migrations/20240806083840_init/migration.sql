-- CreateTable
CREATE TABLE "Organization" (
    "name" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "woman_ration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stored_pair" (
    "name" TEXT NOT NULL,
    "stored_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stored_food" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stored_food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stored_pair_name_stored_id_key" ON "Stored_pair"("name", "stored_id");
