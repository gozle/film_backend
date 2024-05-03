import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Metadata } from "src/models/metadata.mode";

export class CreateMetaDataDto extends PartialType(Metadata) {

    id!: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: 'file' })
    photo: string;

    slug: string;

    @ApiProperty({ required: true })
    age_restriction: string;

    @ApiProperty({
        type: 'number', isArray: true
    })
    actorId: [];

    @ApiProperty({
        type: 'number', isArray: true
    })
    genreId: []

    @ApiProperty({
        type: 'number', isArray: true
    })
    countryId: []

    @ApiProperty()
    categoryId: number;

    @ApiProperty({ type: 'boolean' })
    premium: boolean

}
