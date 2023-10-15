/*
  Warnings:

  - You are about to drop the column `featuredImage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `featuredImage`,
    ADD COLUMN `isFeatured` BOOLEAN NULL;
