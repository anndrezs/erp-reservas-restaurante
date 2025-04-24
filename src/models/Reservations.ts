import mongoose, {Document, Schema} from "mongoose";


export type ReservationStatus = 'pendente' | 'confirmada' | 'cancelada';
export interface IReservation extends Document {
    restaurantId: mongoose.Types.ObjectId;
    tableId: mongoose.Types.ObjectId;
    clienteId: mongoose.Types.ObjectId;
    date: Date;
    status: ReservationStatus;
}
const ReservationSchema = new Schema<IReservation>({
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        tableId: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
        clienteId: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
        date: { type: Date, required: true },
        status: { type: String, enum: ['pendente', 'confirmada', 'cancelada'], default: 'pendente' },

});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);