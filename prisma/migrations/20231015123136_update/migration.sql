-- AlterTable
ALTER TABLE `Order` MODIFY `order_number` INTEGER NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Product` MODIFY `isFeatured` BOOLEAN NULL DEFAULT false;
