import mongoose from "mongoose";

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  id: { type: mongoose.Types.ObjectId },
  createdDate: { type: Date, default: Date.now },
  lastModifiedDate: { type: Date },
  description: { type: String, required: [true, "Description is required"] },
  amount: {
    type: Number,
    requried: [true, "Amount is required"],
    min: [0, "Amount must be greater than 0"],
  },
  remarks: { type: String },
  status: { type: String },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
