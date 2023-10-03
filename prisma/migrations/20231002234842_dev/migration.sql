-- AlterTable
ALTER TABLE `Users` MODIFY `apikey` VARCHAR(191) NULL DEFAULT 'N/A',
    MODIFY `sharecode` VARCHAR(191) NULL DEFAULT 'N/A';

-- CreateTable
CREATE TABLE `UserLimits` (
    `id` VARCHAR(191) NOT NULL,
    `intensity` VARCHAR(191) NULL DEFAULT '10',
    `duration` VARCHAR(191) NULL DEFAULT '1',
    `userlock` VARCHAR(191) NULL,

    UNIQUE INDEX `UserLimits_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
