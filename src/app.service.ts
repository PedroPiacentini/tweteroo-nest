import { Injectable } from '@nestjs/common';
import { User } from './entites/user.entity';
import { Tweet } from './entites/tweet.entity';
import { createTweetDto } from './dtos/tweet.dto';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  postUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  postTweet(body: createTweetDto) {
    const selectedUser = this.users.find((user) => {
      if (user.username === body.username) return user;
    })
    if (!selectedUser) throw new Error("Usuário não existe");
    const tweet = new Tweet(selectedUser, body.tweet);
    return this.tweets.push(tweet);
  }

  getTweets(page?: number) {
    let tweets15 = [];
    if (page) {
      const tweets = [...this.tweets];
      tweets.splice(-15 * (page -1));
      tweets15 = tweets.slice(-15);
    } else {
      tweets15 = this.tweets.slice(-15);
    }
    const formatTweet = [];
    tweets15.forEach(tweet =>{
      formatTweet.push({
        avatar: tweet.user.avatar,
        tweet: tweet.tweet,
        username: tweet.user.username
      })
    })
    return formatTweet;
  }

  getTweetsByUser(username: string) {
    const userTweets = [];
    this.tweets.forEach(tweet => {
      if (tweet.user.username === username) {
        userTweets.push({
          avatar: tweet.user.avatar,
          tweet: tweet.tweet,
          username: tweet.user.username
        })
      }
    })
    return userTweets;
  }
}
