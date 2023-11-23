/*
  Warnings:

  - You are about to drop the column `amount` on the `Confirm_payment` table. All the data in the column will be lost.
  - You are about to drop the column `bank_account` on the `Confirm_payment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Confirm_payment` table. All the data in the column will be lost.
  - Added the required column `bank_accountId` to the `Confirm_payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Confirm_payment` DROP COLUMN `amount`,
    DROP COLUMN `bank_account`,
    DROP COLUMN `name`,
    ADD COLUMN `bank_accountId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `Bank_account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_name` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Confirm_payment` ADD CONSTRAINT `Confirm_payment_bank_accountId_fkey` FOREIGN KEY (`bank_accountId`) REFERENCES `Bank_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
