export interface Report {
  id: string;
  ownerFirstName: string;
  ownerLastName: string;
  date: string;
  category: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  status: string;
  upvotes: number;
}
