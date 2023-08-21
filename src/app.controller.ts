import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entites/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { createTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post("/sign-up")
  @HttpCode(HttpStatus.OK)
  postUser(@Body() body: CreateUserDto) {
    return this.appService.postUser(body);
  }

  @Post("/tweets")
  postTweet(@Body() body: createTweetDto) {
    try {
      return this.appService.postTweet(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
    
  }

  @Get("/tweets")
  getTweets(@Query("page") page: number) {
    if (page) {
      if (page < 1) throw new HttpException("Informe uma página válida!", HttpStatus.BAD_REQUEST);
    }
    
    return this.appService.getTweets(page);
  }

  @Get("tweets/:username")
  getTweetsByUser(@Param("username") username: string) {
    return this.appService.getTweetsByUser(username);
  }
}
