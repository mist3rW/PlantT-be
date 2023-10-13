/*
  Warnings:

  - You are about to drop the column `Brand` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Order_items` ADD COLUMN `guestOrderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `Brand`,
    ADD COLUMN `brand` VARCHAR(191) NULL,
    MODIFY `stock` INTEGER NULL DEFAULT 0,
    MODIFY `desc` VARCHAR(191) NULL,
    MODIFY `menu_order` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
