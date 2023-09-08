-- CreateTable
CREATE TABLE `AirQuality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ts` VARCHAR(191) NOT NULL,
    `aqius` INTEGER NOT NULL,
    `mainus` VARCHAR(191) NOT NULL,
    `aqicn` INTEGER NOT NULL,
    `maincn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
