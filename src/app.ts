import { uuid4 } from './helpers/utils';
import { ISimulationEntityPost } from './models/simulation-entity-post';
import { KafkaService } from './services/kafka-service';
import { ICommandOptions } from './cli';
import { TwitterService } from './services/twitter-service';
import { IAdapterMessage } from 'node-test-bed-adapter';
import { simEntityPostToTweet } from './services/simulation-entity-post-to-tweet';

const log = console.log;

/** Main application */
export class App {
  constructor(private options: ICommandOptions) {
    const twitterService = new TwitterService(options);

    const handler = (message: IAdapterMessage) => {
      const stringify = (m: string | Object) => (typeof m === 'string' ? m : JSON.stringify(m, null, 2));
      switch (message.topic.toLowerCase()) {
        case options.topic:
          twitterService.update(simEntityPostToTweet(message.value as ISimulationEntityPost));
          break;
        default:
          log(
            `Received unknown ${message.topic} message with key ${stringify(message.key)}: ${stringify(message.value)}`
          );
          break;
      }
    };

    const kafka = new KafkaService(options, handler);

    if (options.test) {
      const date = Date.now();
      const time = Date();
      const medium = 'twitter';
      const visibleForParticipant = true;
      const name = this.options.id;
      const owner = this.options.id;
      const senderName = this.options.id;
      const location = {
        latitude: 52.110051,
        longitude: 4.326812
      };
      const posts = [
        {
          guid: uuid4(),
          name,
          owner,
          medium,
          senderName,
          visibleForParticipant,
          date,
          location,
          body: `This is a simple test message from TNO sent at ${time}.`,
        } as ISimulationEntityPost,
        {
          guid: uuid4(),
          name,
          owner,
          medium,
          senderName,
          visibleForParticipant,
          date,
          body: `This is a test message containing an image sent at ${time}.`,
          files: [`iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAAXNSR0IArs4c6QAAAARnQU1BAACx
      jwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4O
      Dg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEh
      ISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0
      NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0VFRUZGRkdHR0hI
      SElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltb
      W1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5u
      bm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/fwAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL26zOIAAAEAdFJOU///////
      ////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      /////////////////////////////wBT9wclAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRT
      b2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAB3JJREFUaEPtm/tb1EYUhrMLyF3wglrAO+Kd
      avHSWhVrq1WkWCsqFrygFUXuqK1g9V9P55z5JslMzmQ3a7BPn/L+wJ6ZOTPfJpvMzDkJQfgvsSH8
      xdgQLoLFO9/2dbXUlcqNnXtOXX+OWoeChedPlAOBHXfRHlOk8Nsd0JGoH4EXKE54dhMkvJyHJ1OY
      cDdGV8fWf/MVKsNw5f7ZdtQHQfkv1CqKEm7QQ7f+grLNy326OfgVFYUJ69N8FSWJmVZ2ic5FMcJH
      acxTKPh4WVJOJRQKEibdMdgZ0K32EHYhwgtqwN2ws5hRfjthFyJ8t7oD1mfGmPj8LO6o8fbBzuJ9
      0cL3acBHKGTA1z7sQoRnacDgO5R8vKljN5QKEebfTt0qznRs8W6LdloPYcXWcdTYrBxHuwJVxQif
      wqBM8+mxN6gPw49TV3ahHqChGOH4kLMY+ER/TQ98fiZ8yE3mZ5Qo00SuPlt1h6KE9Z0yH77oo88U
      7TfY6Zoyf2CrOGF9sh+zOf3zQHcLrQhBw7ZDF8fXuJKgbwezOOF3JBQMoSRDHjCLEw6XWDlr5qQL
      4RjsAoXDkM+uuXgEqBlmscJhMw1dRiHFJetrVRR+PthCwzFNZ5dQ66GH3VBwoaYF2BWEFw7wQBY7
      P6FR5Dz7oGDTrxpaYCsyhOVbMgja0C4yRh71KFhQw3vYCp/wot4UyozCSeIFOfShkIDu4W7YhCz8
      MUtWATcR3hXAjjnp1opjmO23l21wFKHeZ2EbXlEva7kWhGf4fgyCrtFVFf6J0V/mIdOv6d5T1Gc7
      bE16iNPkFHTO6ZIOEVLoRg9pB7rBo628JjUEh5pbULhABQm0y6QcOKBbRgG4Q9BVVTJBvH99hYOM
      aq+DyfCF5S4fzhBNyuUr2BxxeICHyBnVfgY2cZk67Echwh6iTblcgv2E/D00w0eEHGAS56jciUKM
      JbxTuei1PAxvkL8POQrW0A+amNwOkX8jCgmSwoPKxewP+fx4gZOI3b6fitIUmvCZUy5mMqUlzE9y
      6nPZo9oPwca9KS7RCWE1b8zDvE7+fuAlYrVT/OqZ5mIndVLuwZwkfz+9cBNR7fG0RdFSB2yHSHgt
      kQ7i4f3AS0a1R1J8wLBdovrmKFbPun+Jn+BWb+WtDMohOmJKjfiWUCM8Fbt38fBezPEMBrdgWZAL
      TJ6iYaYwDQ3Bn7BuUtcM4KYUYNj0KpfDsDsS7i6mIbHhzeY13Brt5TWCA7Mr2qabskebKVLfyAkq
      XUzoc1TeWClo+gvap9gmc5CtFK7wB/L1Y87LgyBYgZlCZxyCThUz8Xx5EPU2rvBm7uRjL7zUoWTE
      Ko3w3hOGvCePU6oJXGHu4SOaOUr+eIGghZFQ22ha76L7NIkjfFj3kIkOssHaIUtM7+YeO/hIxC/p
      CLO7h+PwId0fYWbA69LsU/VHzDZWLxzlhNXF0w8zkyOqUyvlsZ+hwsIWnmAJkRm4PFd21rKYQHd0
      t5fAFvYu/9GSShu3aFNWAdwhcnrVFtbBXppv0D5XrwqpfZuPvdzXE3XYwsPs6rIJkeki3RsVU5Yx
      mXF6FReX3rkt8e44/q2rgP1hp3AaMN152QU/B7Ny2FCHl7BTOMI6deOjPA03G9oJn4OdRK03kzDT
      uKfiay0hMgwfB50jKev1qGpSv8EQD5Nmk3l84nAM7VK0kIXw49PO2KHkBtqGp4ilNSdQWw2CsNre
      JncDpQO/ozrNdvhE3EdDZURhZvX1H9PexZ6R5rmMxJ6NX7gSq55kgZDxkahZWMi9GTxXv02NwpxH
      89K4CrcMahPO3pkpMsMrphZhs6XKBFtrL/mF5yvN56DexLwyuYXjdwEqorZ6fnIKZ2ZG0khLB8gn
      HOfMq8S/dOQSxmi5MFkGlzzC4xgrF1VHi1lgrFyIm2pFLmHaU+ckmVu0yHdx3cNwVeN/NySfcEih
      UA4uoptATuGcPzM6SfynhOP9nZ/SVcpaoZNELcIq7s56V02pDnzU2TV0kqhNmBjrpwguRdeVRd2+
      bsKGlZlnTx49fvZqWR1lknUX9rEh7JBXOLzWlLuLSDGj1EAe4bmncjrAVz/rqWeqFZ40W+kmO+U+
      YV73bIpfuSQemvrm31DjUJ0wZ2EjdpmcengQNZruKM/IWb2Invjdl5jKwreldwV6hidHbVVN763J
      USmq2p16jFBZGF2DYPOFkSHpeUXH9yNDqUBZ0XFx5PI22EH05MFQrfDmFyi+tVP4HSat88ZeNzpN
      knoZ37Um4fJl2JpbJjIu2w+Fh/Hmb1BnHiBoblB9fuHxdzCSfJi4Pe4ORfjq11LpjMrC60TVwg/0
      ddLqhvv3tnJ9m3vZjunn/O2+R83VCa8kr9rWOB5aiq9apR3/f8CC/jaadnNdWlQhvDKAEWL20zW7
      jLRqgoOU1FxKvIQJ+mZ5pCSVhdH3c3Ev0aqFu/WrXJ/c5zS9Ohf2tz2rqrlKP/RfM/NebcLWPzk8
      iqPkhuSKMcGJcaYhuWI85Pr8wi2HH8CKmRpoL7UcSb9n++Qk1afTrY9PtOUXXic2hL8Y/zfhMPwH
      ZoblFKWFgCwAAAAASUVORK5CYII=
      `],
        },
      ];
      kafka.on('ready', () => kafka.send(posts));
    }
  }
}
