import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [PostsModule, PrismaModule, AuthModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
