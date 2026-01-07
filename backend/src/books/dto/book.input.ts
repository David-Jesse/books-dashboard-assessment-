// import {InputType, Field, Int} from "@nestjs/graphql"
// import {IsInt, IsNotEmpty, IsOptional, Min} from 'class-validator'
//
// @InputType()
// export class CreateBookInput {
//     @Field()
//     @IsNotEmpty()
//     name: string;
//
//     @Field()
//     @IsNotEmpty()
//     description: string;
// }
//
// @InputType()
// export class UpdateBookInput {
//     @Field()
//     @IsInt()
//     @Min(1)
//     id: number;
//
//     @Field({nullable: true})
//     @IsOptional()
//     @IsNotEmpty()
//     name?: string;
//
//     @Field({nullable: true})
//     @IsOptional()
//     @IsNotEmpty()
//     description?: string;
// }