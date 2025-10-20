/*
  Warnings:

  - You are about to drop the column `category` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `blog_id` on the `BlogImage` table. All the data in the column will be lost.
  - You are about to drop the column `job_description` on the `Career` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `Career` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Career` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogId` to the `BlogImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Career` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Career` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Career` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BlogImage" DROP CONSTRAINT "BlogImage_blog_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectDetail" DROP CONSTRAINT "ProjectDetail_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectService" DROP CONSTRAINT "ProjectService_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectSupport" DROP CONSTRAINT "ProjectSupport_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."Blog" DROP COLUMN "category",
DROP COLUMN "shortDescription",
DROP COLUMN "tags",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."BlogImage" DROP COLUMN "blog_id",
ADD COLUMN     "blogId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Career" DROP COLUMN "job_description",
DROP COLUMN "short_description",
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Companies" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'unknown';

-- AlterTable
ALTER TABLE "public"."Service" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Team" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Testimonial" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Career_slug_key" ON "public"."Career"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_slug_key" ON "public"."Companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_email_key" ON "public"."Companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "public"."Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "public"."Team"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_slug_key" ON "public"."Testimonial"("slug");

-- AddForeignKey
ALTER TABLE "public"."ProjectService" ADD CONSTRAINT "ProjectService_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectDetail" ADD CONSTRAINT "ProjectDetail_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectSupport" ADD CONSTRAINT "ProjectSupport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogImage" ADD CONSTRAINT "BlogImage_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
