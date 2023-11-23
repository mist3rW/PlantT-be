-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `Confirm_payment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `bank_account` VARCHAR(191) NOT NULL,
    `slip_img_url` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Confirm_payment` ADD CONSTRAINT `Confirm_payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
