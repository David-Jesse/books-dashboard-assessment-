import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        /**
         * Loads environment variables from .env files.
         * isGlobal: true makes it available throughout the app.
         */
        ConfigModule.forRoot({ isGlobal: true }),

        /**
         * Database Configuration (SQLite)
         * The 'imports: [ConfigModule]' line is required to fix the TS2345 error.
         */
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'sqlite',
                // 🟢 CRITICAL: Use /tmp for Render to ensure write permissions
                database: process.env.RENDER === 'true'
                    ? '/tmp/db.sqlite'
                    : 'db.sqlite',
                autoLoadEntities: true,
                synchronize: true, // Use only for the assessment/dev
            }),
        }),

        /**
         * GraphQL Configuration (Apollo)
         * We pass both 'req' and 'res' into the context so that
         * authentication guards and CORS logic can access them.
         */
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            sortSchema: true,
            introspection: true,
            playground: true,

            context: ({req, res}) => ({req, res}),
        }),

        AuthModule,
        BooksModule,
    ],
})
export class AppModule {}