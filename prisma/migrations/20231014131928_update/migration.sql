/*
  Warnings:

  - Added the required column `featuredImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFeatured` to the `Product_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `featuredImage` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product_image` ADD COLUMN `isFeatured` BOOLEAN NOT NULL;
