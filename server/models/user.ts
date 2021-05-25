import { Schema, model, Document } from "mongoose";

interface Users extends Document {
  bio: String;
  userid: String;
  authentication: String;
  user_flags: Array<String>;
}

const usersSchema = new Schema({
  bio: {
    type: String,
    default: "This user has no bio",
  },
  userid: {
    type: String,
    required: true,
  },
  authentication: {
    type: String,
  },
  user_flags: {
    type: Array,
  },
  message_queue: {
    type: Array,
  },
});

export default model<Users & Document>("Users", usersSchema);
