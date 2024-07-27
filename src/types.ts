import { DocumentData } from "firebase/firestore";

export interface Shipment extends DocumentData {
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  sender_address: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  receiver_address: string;
  current_location: string;
  package_name: string;
  package_weight: string;
  package_description: string;
  status: string;
  created_at: number;
  trackingNumber: number;
}

export function addDaysToDate(date: Date, daysToAdd: number): Date {
  const newDate = new Date(date.getTime()); // Create a copy to avoid modifying original
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
}
