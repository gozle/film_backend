import { PartialType } from '@nestjs/swagger';
import { CreateGiftDto } from './create-gift.dto';
import { IsAlphanumeric, IsBoolean, IsNumber } from "class-validator";

export class UpdateGiftDto extends PartialType(CreateGiftDto) {



    @IsAlphanumeric()
    code: string;

    @IsNumber()
    duration: number;

    @IsBoolean()
    is_active: boolean;

    @IsNumber()
    premiumId: number;

}
