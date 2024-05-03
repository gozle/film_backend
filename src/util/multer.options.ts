import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as CONSTANTS from "./multer.constants"

@Injectable()
export class MulterService {
    private readonly storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); // Change 'uploads' to your desired directory
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    private videoFilter = function (req, file, cb) {
        const allowedVideoTypes = ['video/mp4', 'video/quicktime'];
        if (allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only mp4 and quicktime video formats are allowed!'), false);
        }
    };

    private imageFilter = function (req, file, cb) {
        const allowedMimeTypes = CONSTANTS.MIME_TIPES_PHOTO;
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPG, WEBP and PNG images are allowed!'), false);
        }
    };

    getVideoUploadMiddleware() {
        return multer({ storage: this.storage, fileFilter: this.videoFilter }).single('video');
    }

    getImageUploadMiddleware() {
        return multer({ storage: this.storage, fileFilter: this.imageFilter }).single('image');
    }
}
