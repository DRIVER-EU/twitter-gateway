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

For example, on Windows, create a file `env.bat` and run it once before calling the application:

```bat
@ECHO OFF
REM Set the environment variables for testing.
REM You can use `echo %KAFKA%` to inspect them, or use `set` to list them all.
SET KAFKA=localhost:3501
SET SCHEMA=localhost:3502
SET CONSUME_TOPIC=simulation_entity_post
SET CONSUMER_KEY=YOUR_KEY
SET CONSUMER_SECRET=YOUR_CONSUMER_SECRET
SET ACCESS_TOKEN=YOUR_ACCESS_TOKEN
SET ACCESS_SECRET=YOUR_ACCESS_SECRET
```

Alternatively, you can specify them via the command line. Run `twitter-gateway -h` to see an overview.

## Build instructions

`npm run build` to build to the `./dist` folder.

## NOTE

When using this gateway service, you may encounter several errors:
1. The schemas are not found: This typically happens when you start the test-bed for the first time, and it hasn't been properly initialized (for example, using the admin tool), and no schema's have been uploaded. Use `twitter-gateway -s --test` to publish the schemas. This assumes that you have a local folder named `schemas` that contains the schemas (it will recursively visit all folders).
2. The topic does not exist: Send out a test-message to create the topic using `twitter-gateway --test`. These messages are still not published to Twitter though. You have to start it using `twitter-gateway`.
3. You get authentication errors: Did you supply all the required settings, either via the environment or via the command line (see above).


