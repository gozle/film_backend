import { IsAlphanumeric, IsBoolean, IsByteLength, IsNumber } from "class-validator";

export class CreateGiftDto {

    @IsNumber()
    premiumId: number;

    @IsNumber()
    createCount: number;

}
