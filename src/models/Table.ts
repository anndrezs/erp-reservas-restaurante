import mongoose, {Document, Schema} from "mongoose";


export interface ITable extends Document {
  number: number;
  seats: number;
  isAvailable: boolean;
  restaurantId: mongoose.Schema.Types.ObjectId;
}

const TableSchema = new Schema<ITable>({
  number: { type: Number, required: true },
  seats: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
}); 

export default mongoose.model<ITable>('Table', TableSchema);