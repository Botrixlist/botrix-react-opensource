import { Schema, model, Document } from "mongoose";

interface Votes extends Document {
  user_id: String;
  bot_id: String;
  time: Date;
}

const votesSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  bot_id: {
    type: String,
  },
  time: {
    type: Number,
  },
});

export default model<Votes & Document>("Votes", votesSchema);
