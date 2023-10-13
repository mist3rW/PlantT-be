/*
  Warnings:

  - A unique constraint covering the columns `[SKU]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `Product_SKU_key` ON `Product`(`SKU`);
