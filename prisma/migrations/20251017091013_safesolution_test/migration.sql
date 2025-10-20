/*
  Warnings:

  - You are about to drop the column `icon` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `tab` on the `Service` table. All the data in the column will be lost.
  - Added the required column `image` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Companies" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Service" DROP COLUMN "icon",
DROP COLUMN "tab",
ADD COLUMN     "image" TEXT NOT NULL;
