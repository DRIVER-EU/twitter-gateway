import commandLineArgs from 'command-line-args';
import { OptionDefinition } from 'command-line-args';
import * as npmPackage from '../package.json';
import { App } from './app';

export interface ICommandOptions {
  /** Specify the name/id of this gateway service (twitter_gateway) */
  id: string;
  /** Display help output */
  help: boolean;
  /** Display version number */
  version: boolean;
  /** Kafka host */
  kafka: string;
  /** Kafka schema registry */
  registry: string;
  /** Topic to receive from */
  topic: string;
  /** Automatically register all schemas in the ./schemas folder */
  schemas: boolean;
  /** Twitter consumer key */
  consumerKey: string;
  /** Twitter consumer secret */
  consumerSecret: string;
  /** Twitter access token for an application */
  accessToken: string;
  /** Twitter access secret for an application */
  accessSecret: string;
  /** Send a test message */
  test: boolean;
}

export interface IOptionDefinition extends OptionDefinition {
  typeLabel: string;
  description: string;
}

export class CommandLineInterface {
  static optionDefinitions: IOptionDefinition[] = [
    {
      name: 'help',
      alias: 'h',
      type: Boolean,
      typeLabel: '{underline Boolean}',
      description: 'Show help text.'
    },
    {
      name: 'version',
      alias: 'v',
      type: Boolean,
      typeLabel: '{underline Boolean}',
      description: 'Show version number.'
    },
    {
      name: 'id',
      alias: 'i',
      type: String,
      typeLabel: '{underline String}',
      defaultValue: process.env.TWITTER_GATEWAY_ID || 'twitter_gateway',
      description: 'ID or name of the twitter gateway service ($TWITTER_GATEWAY_ID or twitter_gateway).'
    },
    {
      name: 'schemas',
      alias: 's',
      type: Boolean,
      defaultValue: false,
      typeLabel: '{underline Boolean}',
      description: 'Automatically register the schemas in the "./schemas" folder when set.'
    },
    {
      name: 'topic',
      alias: 't',
      type: String,
      defaultValue: process.env.CONSUME_TOPIC || 'simulation_entity_post',
      typeLabel: '{underline String}',
      description: 'Topic to consume messages from ($CONSUME_TOPIC or simulation_entity_post).'
    },
    {
      name: 'kafka',
      alias: 'k',
      type: String,
      defaultValue: process.env.KAFKA || 'localhost:3501',
      typeLabel: '{underline String}',
      description: 'Kafka broker url ($KAFKA or localhost:3501).'
    },
    {
      name: 'registry',
      alias: 'r',
      type: String,
      defaultValue: process.env.SCHEMA || 'localhost:3502',
      typeLabel: '{underline String}',
      description: 'Schema Registry url ($SCHEMA or localhost:3502).'
    },
    {
      name: 'consumerKey',
      alias: 'c',
      type: String,
      defaultValue: process.env.CONSUMER_KEY,
      typeLabel: '{underline String}',
      description: 'Twitter consumer key ($CONSUMER_KEY).'
    },
    {
      name: 'consumerSecret',
      alias: 'C',
      type: String,
      defaultValue: process.env.CONSUMER_SECRET,
      typeLabel: '{underline String}',
      description: 'Twitter consumer secret ($CONSUMER_SECRET).'
    },
    {
      name: 'accessToken',
      alias: 'a',
      type: String,
      defaultValue: process.env.ACCESS_TOKEN,
      typeLabel: '{underline String}',
      description: 'Twitter application access key ($ACCESS_TOKEN).'
    },
    {
      name: 'accessSecret',
      alias: 'A',
      type: String,
      defaultValue: process.env.ACCESS_SECRET,
      typeLabel: '{underline String}',
      description: 'Twitter application access secret ($ACCESS_SECRET).'
    },
    {
      name: 'test',
      alias: 'T',
      type: Boolean,
      defaultValue: false,
      typeLabel: '{underline String}',
      description: 'Send a test message to the twitter account.'
    },
  ];

  static sections = [
    {
      header: `${npmPackage.name.toUpperCase()}, v${npmPackage.version}`,
      content: `${npmPackage.license} license.

    ${npmPackage.description}`
    },
    {
      header: 'Options',
      optionList: CommandLineInterface.optionDefinitions
    },
    {
      header: 'Examples',
      content: [
        {
          desc: '01. Listen to tweets and publish them to twitter. All required params are passed via the environment.',
          example: '$ twitter-gateway -s --test'
        }
      ]
    }
  ];
}

const options = commandLineArgs(CommandLineInterface.optionDefinitions) as ICommandOptions;
if (options.version) {
  console.log(npmPackage.version);
  process.exit(0);
} else if (options.help) {
  const getUsage = require('command-line-usage');
  const usage = getUsage(CommandLineInterface.sections);
  console.log(usage);
  process.exit(0);
} else {
  options.kafka = options.kafka.replace('http://', '');
  options.registry = options.registry.replace('http://', '');
  // console.log(JSON.stringify(options, null, 2));
  new App(options);
}
