export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

export interface ReservationData {
  service: Service | null;
  professional: Professional | null;
  date: Date | null;
  time: string | null;
}
