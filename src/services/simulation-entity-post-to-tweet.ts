import { ISimulationEntityPost } from '../models/simulation-entity-post';
import { ITweet } from '../models/tweet';

/**
 * Convert a simulation-entity-post message to a tweet.
 * NOTE: Only the first files (media item) is converted.
 */
export const simEntityPostToTweet = (post: ISimulationEntityPost) =>
  ({
    status: post.body,
    media_data: post.files && post.files.length > 0 ? post.files[0] : undefined,
    lat: post.location ? post.location.latitude : undefined,
    long: post.location ? post.location.longitude : undefined,
  } as ITweet);
