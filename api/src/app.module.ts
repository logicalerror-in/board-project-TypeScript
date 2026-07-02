import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PostsModule, PrismaModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
