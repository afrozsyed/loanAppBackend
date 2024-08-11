import  Mongoose  from "mongoose";

const sequenceSchema = new Mongoose.Schema({
    sequenceName: {
        type: String,
        required: true,
        unique: true,
        index: true
      },
      sequenceValue: {
        type: Number,
        required: true,
        default: 0
      }
});

export const Sequence = Mongoose.model("Sequence", sequenceSchema);