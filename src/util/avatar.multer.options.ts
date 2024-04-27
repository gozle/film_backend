import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer"

import * as CONSTANTS from "./multer.constants"
import { MulterModule } from "@nestjs/platform-express";

export const MulterAvatarOptions: MulterModule = {
    storage: diskStorage({
        destination: 'uploads/avatars',
        filename: (req, file, cb) => {
            const filename = `${Date.now()}_${file.originalname}`;
            cb(null, filename);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = CONSTANTS.MIME_TIPES_PHOTO;
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new BadRequestException('Invalid file type'), false);
        }
    },
};
