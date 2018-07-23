import Twit from 'twit';
import { ICommandOptions } from '../cli';
import { ITweet } from '../models/tweet';

export class TwitterService {
  private twit: Twit;

  constructor(options: ICommandOptions) {
    this.twit = new Twit({
      consumer_key: options.consumerKey,
      consumer_secret: options.consumerSecret,
      access_token: options.accessToken,
      access_token_secret: options.accessSecret,
      timeout_ms: 60000,
      // strictSSL: true,
    });
  }

  public update(tweets: ITweet | ITweet[]) {
    tweets = tweets instanceof Array ? tweets : [tweets];
    const post = (tweet: ITweet) => this.twit.post('/statuses/update', tweet);
    const uploadMedia = (tweet: ITweet) => {
      return this.twit.post('media/upload', { media_data: tweet.media_data }).then((value) => {
        const mediaIdStr = (value.data as any).media_id_string as string;
        const metaParams = { media_id: mediaIdStr, alt_text: tweet.alt_text };
        tweet.media_ids = [mediaIdStr];
        delete tweet.media_data;
        return this.twit.post('media/metadata/create', metaParams).then(() => post(tweet));
      });
    };
    return Promise.all(tweets.map((tweet) => (tweet.media_data ? uploadMedia(tweet) : post(tweet)))).catch((reason) =>
      console.warn(reason)
    );
  }
}
