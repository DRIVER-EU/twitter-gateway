# Twitter-gateway

Gateway service to post tweets, published to the Kafka-based DRIVER+ Test-bed, to twitter.

## Twitter Credentials and Privacy

You will need valid Twitter developer credentials in the form of a set of consumer and access tokens/keys. You can get these [here](https://apps.twitter.com). Do not forgot to adjust your permissions - most POST request require write permissions. Next, update your [privacy settings](https://twitter.com/settings/safety), so not everyone will be able to follow your tweets.

## Usage

Run `twitter-gateway` to start listening to the $CONSUME_TOPIC topic. Each received message is posted to Twitter. Please note that, in case you are including multiple media files, only the first is uploaded and sent. In case you have just started the DRIVER+ Test-bed, initialize it using `twitter-gateway -s --test`, so you upload the basic schemas as well as publish a test message to the CONSUME topic.

Also the following values are extracted from the environment (specified using SET):
- $KAFKA
- $SCHEMA
- $CONSUMER_KEY
- $CONSUMER_SECRET
- $ACCESS_KEY
- $ACCESS_SECRET.

Alternatively, you can specify them via the command line. Run `twitter-gateway -h` to see an overview.

## Build instructions

`npm run build` to build to the `./dist` folder.

## NOTE

When using this gateway service, you may encounter several errors:
1. The schemas are not found: This typically happens when you start the test-bed for the first time, and it hasn't been properly initialized (for example, using the admin tool), and no schema's have been uploaded. Use `twitter-gateway -s --test` to publish the schemas.
2. The topic does not exist: Send out a test-message to create the topic using `twitter-gateway --test`. These messages are still not published to Twitter though. You have to start it using `twitter-gateway`.
3. You get authentication errors: Did you supply all the required settings, either via the environment or via the command line (see above).


