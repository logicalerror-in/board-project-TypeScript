import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

type PostResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PostResponse[]> {
    return this.prisma.post.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(postId: number): Promise<PostResponse> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post === null) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostResponse> {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
      },
    });
  }

  async update(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    if (
      updatePostDto.title === undefined &&
      updatePostDto.content === undefined
    ) {
      throw new BadRequestException('수정할 값이 필요합니다.');
    }

    await this.findOne(postId);

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
      },
    });
  }

  async remove(postId: number): Promise<void> {
    await this.findOne(postId);

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
