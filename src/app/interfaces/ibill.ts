export interface IBill {
  id: number;
  totalPrice: number;
  checkIn: string;
  checkOut: string;
  status: string;
  order: number;
  description: string;
  customer_id: number;
  house_id: number;
}
