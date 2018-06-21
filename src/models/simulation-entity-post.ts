/**
 * Common Simulation Space Post, representing a media entity inside the simulation world (e.g. email, news article, facebook post, etc.). *Copyright (C) 2017-2018 XVR Simulation B.V., Delft, The Netherlands, Martijn Hendriks <hendriks @ xvrsim.com>. This file is part of DRIVER+ WP923 Test-bed infrastructure project.
 * This file is licensed under the MIT license : https://github.com/DRIVER-EU/avro-schemas/blob/master/LICENSE*
 */
export interface ISimulationEntityPost {
  guid: string;
  name: string;
  owner: string;
  medium: string;
  header?: string;
  intro?: string;
  body: string;
  /** the base64 encoded media items attached to this post */
  files?: string[];
  /** indication whether or not this post is visible for any participant */
  visibleForParticipant: boolean;
  /** the name of the sender sending this post */
  senderName: string;
  /** the reference to the role sending this post */
  senderRole?: string;
  /** list of references to the XVR roles that should receive this post personally */
  recipients?: string;
  /** The fictive creation date and time of this post as the number of milliseconds from the unix epoch, 1 January 1970 00:00:00.000 UTC. */
  date: number;
  /** location of this item */
  location?: {
    /** latitude in degrees (-90, 90] - 0 is equator */
    latitude: number;
    /** longitude in degrees (-180, 180] - 0 is line [geographic north - Greenwich - geographic south] */
    longitude: number;
    /** altitude in meters - 0 is surface of WGS84-based ellipsoid */
    altitude?: number;
  };
}
