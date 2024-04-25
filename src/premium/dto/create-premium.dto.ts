import { IsAlphanumeric, IsByteLength, IsInt, IsNumber } from "class-validator";


export class CreatePremiumDto {

    @IsAlphanumeric()
    name: string;

    @IsByteLength(5, 5000)
    description: string;

    @IsAlphanumeric()
    duration: string;

    @IsInt()
    price: number;

    @IsInt()
    device_count: number
}
