-- AlterTable
ALTER TABLE `Users` MODIFY `apikey` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    MODIFY `sharecode` VARCHAR(191) NOT NULL DEFAULT 'N/A';
