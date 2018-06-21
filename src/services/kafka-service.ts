import { ISimulationEntityPost } from './../models/simulation-entity-post';
import path from 'path';
import { ICommandOptions } from './../cli';
import { TestBedAdapter, Logger, LogLevel, IAdapterMessage } from 'node-test-bed-adapter';
import { ProduceRequest } from 'kafka-node';
import { EventEmitter } from 'events';

const log = Logger.instance;

export class KafkaService extends EventEmitter {
  private adapter: TestBedAdapter;

  constructor(private options: ICommandOptions, handler: (message: IAdapterMessage) => void) {
    super();
    const clientId = 'twitter-gateway';
    const consume = options.test ? undefined : [{ topic: options.topic }];
    const produce = options.test ? [options.topic] : undefined;
    this.adapter = new TestBedAdapter({
      kafkaHost: options.kafka,
      schemaRegistry: options.registry,
      fetchAllSchemas: false,
      fetchAllVersions: false,
      autoRegisterSchemas: options.schemas,
      schemaFolder: path.resolve(process.cwd(), './schemas'),
      wrapUnions: 'auto',
      clientId,
      consume,
      produce,
      logging: {
        logToConsole: LogLevel.Info,
        logToKafka: LogLevel.Warn,
      },
    });
    this.adapter.on('ready', () => {
      this.emit('ready');
      this.adapter.on('message', (message) => handler(message));
      log.info(`${clientId} is connected.`);
    });
    this.adapter.connect();
  }

  public send(posts: ISimulationEntityPost | ISimulationEntityPost[]) {
    this.adapter.addProducerTopics(this.options.topic).then(() => {
      if (!(posts instanceof Array)) {
        posts = [posts];
      }
      posts.map((post: ISimulationEntityPost) => {
        const payload = {
          topic: this.options.topic,
          attributes: 1,
          messages: post,
        } as ProduceRequest;
        this.adapter.send(payload, (err, data) => {
          if (err) {
            console.error(err);
            process.exit(1);
          } else {
            console.log(JSON.stringify(data, null, 2));
            process.exit(0);
          }
        });
      });
    });
  }

  public get time() {
    return this.adapter.simTime;
  }
}
