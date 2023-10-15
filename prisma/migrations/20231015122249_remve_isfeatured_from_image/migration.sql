/*
  Warnings:

  - You are about to drop the column `isFeatured` on the `Product_image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Product_image` DROP COLUMN `isFeatured`;
