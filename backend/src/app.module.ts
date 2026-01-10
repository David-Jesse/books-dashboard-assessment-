import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

/**
 * AppModule is the root module of the application.
 * It is responsible for wiring together configuration,
 * database access, GraphQL, authentication, and feature modules.
 */
@Module({
    imports: [
        /**
         * ConfigModule is loaded globally so environment variables
         * (e.g. Auth0 domain, audience, ports) can be accessed
         * throughout the application without repeated imports.
         */
        ConfigModule.forRoot({ isGlobal: true }),

        /**
         * Configure TypeORM asynchronously to allow environment-based
         * configuration if needed in the future.
         *
         * SQLite is used to satisfy the assessment constraint of
         * a file-based relational database stored within the repository.
         */
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: () => ({
                type: 'sqlite',

                // Local file-based database for simplicity and portability
                database: '/tmp/db.sqlite',

                // Automatically register all @Entity() classes
                autoLoadEntities: true,

                /**
                 * synchronize is enabled for development convenience.
                 * In a production environment, migrations would be used instead.
                 */
                synchronize: true,
            }),
        }),

        /**
         * Configure GraphQL using Apollo as the underlying driver.
         * The schema is generated automatically from decorators,
         * ensuring strong typing and minimal boilerplate.
         */
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            inject: [ConfigService],
            useFactory: () => ({
                /**
                 * Auto-generate the GraphQL schema file from code-first
                 * definitions. This keeps the schema in sync with resolvers.
                 */
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

                // Deterministic schema ordering for easier review and debugging
                sortSchema: true,
                csrfPrevention: false,

                cors: {
                    origin: [
                        'https://scrapays-assessment.netlify.app',
                        'http://localhost:5173',
                    ],
                    credentials: false,
                    allowedHeaders: ['Authorization', 'Content-Type'],
                    methods: ['POST'],
                },
                /**
                 * Explicitly pass the HTTP request into the GraphQL context.
                 * This is required so authentication guards can access
                 * the Authorization header for JWT validation.
                 */
                context: ({ req, res }) => ({ req, res }),

                // Enable GraphQL Playground for local development and testing
                playground: true,
            }),
        }),

        /**
         * Feature modules are imported last to keep the root module
         * focused on infrastructure and application wiring.
         */
        AuthModule,
        BooksModule,
    ],
})

export class AppModule {}