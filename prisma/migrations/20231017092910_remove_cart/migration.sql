/*
  Warnings:

  - You are about to drop the column `cartId` on the `Cart_items` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Cart_items` DROP FOREIGN KEY `Cart_items_cartId_fkey`;

-- AlterTable
ALTER TABLE `Cart_items` DROP COLUMN `cartId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- DropTable
DROP TABLE `Cart`;

-- AddForeignKey
ALTER TABLE `Cart_items` ADD CONSTRAINT `Cart_items_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
