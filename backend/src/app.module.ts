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
            useFactory: (configService: ConfigService) => ({
                type: 'sqlite',
                // On Render, /tmp is the only writable directory for non-persistent disks
                database: configService.get<string>('DATABASE_PATH') || '/tmp/db.sqlite',
                autoLoadEntities: true,
                synchronize: true, // Auto-creates tables based on entities (Dev only)
            }),
        }),

        /**
         * GraphQL Configuration (Apollo)
         * We pass both 'req' and 'res' into the context so that
         * authentication guards and CORS logic can access them.
         */
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                sortSchema: true,

                // Disable the old playground to avoid the conflict
                playground: false,

                // Apollo Server 4/5 uses "plugins" for the landing page.
                // Leaving this empty defaults to the modern Apollo Sandbox.
                plugins: [],

                introspection: true, // Necessary for the sandbox to work on Render
                cors: false,
                csrfPrevention: false,
                context: ({ req, res }) => ({ req, res }),
            }),
        }),

        AuthModule,
        BooksModule,
    ],
})
export class AppModule {}