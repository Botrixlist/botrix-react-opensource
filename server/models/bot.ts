import { Schema, Document, model } from "mongoose";

interface Bots extends Document {
  addedAt: Date;
  username: any;
  botid: String;
  botTags: Array<String>;
  botLibrary: String;
  certified: String;
  votes: bigint;
  usersVoted: Array<Object>;
  logo: String;
  invite: String;
  description: String;
  long: String;
  prefix: String;
  state: String;
  website: String;
  support: String;
  owners: Array<String>;
  auth: String;
  servers: bigint;
  shards: bigint;
  users: bigint;
  views: bigint;
  nsfw: Boolean;
  api_banned: Boolean;
  bannerURL: String;
  webhook: String;
  badges: Array<String>;
  themeColor: String;
  backgroundColor: String;
  vanity: String;
}

const botsSchema = new Schema({
  addedAt: {
    default: () => new Date(),
    type: Date,
  },
  username: {
    type: String,
    required: true,
  },
  botid: {
    type: String,
    required: true,
    unique: true,
  },
  botTags: {
    type: Array,
    required: false,
  },
  botLibrary: {
    type: String,
    required: false,
  },
  certified: {
    type: String,
    required: false,
    default: "unverified",
  },
  votes: {
    type: Number,
    required: false,
    default: 0,
  },
  usersVoted: {
    type: Array,
    required: false,
    default: [],
  },
  logo: {
    type: String,
    required: true,
  },
  invite: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    default: "unverified",
  },
  website: {
    type: String,
    required: false,
  },
  support: {
    type: String,
    required: true,
  },
  owners: {
    type: Array,
    required: true,
  },
  auth: {
    type: String,
  },
  servers: {
    type: Number,
    default: 0,
  },
  shards: {
    type: Number,
    default: 0,
  },
  users: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  nsfw: {
    type: Boolean,
    default: false,
  },
  bannerURL: {
    type: String,
    default:
      "https://cdn.discordapp.com/attachments/735022938419363891/754635158958768138/wp4462550.png",
  },
  webhook: {
    type: String,
    default: "none",
  },
  badges: {
    type: Array,
  },
  themeColor: {
    type: String,
  },
  backgroundColor: {
    type: String,
  },
  api_banned: {
    type: Boolean,
    default: false,
  },
  vanity: {
    type: String,
  },
});

export default model<Bots & Document>("Bots", botsSchema);
