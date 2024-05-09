import multer, { diskStorage } from 'multer';
import * as CONSTANTS from './multer.constants'
import { BadRequestException, } from '@nestjs/common';


export const multerOptions: any = {
    storage: diskStorage({
        destination: 'uploads/videos',
        filename: (req, file, cb) => {
            const filename = `${Date.now()}_${file.originalname}`;
            cb(null, filename);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = CONSTANTS.MIME_TIPES;
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new BadRequestException('Invalid file type'), false);
        }
    },
};

