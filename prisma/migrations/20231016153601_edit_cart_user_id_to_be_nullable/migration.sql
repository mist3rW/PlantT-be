/*
  Warnings:

  - You are about to drop the column `guestOrderId` on the `Order_items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Shipping_address` DROP FOREIGN KEY `Shipping_address_userId_fkey`;

-- AlterTable
ALTER TABLE `Cart` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Order_items` DROP COLUMN `guestOrderId`;

-- AlterTable
ALTER TABLE `Shipping_address` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipping_address` ADD CONSTRAINT `Shipping_address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
