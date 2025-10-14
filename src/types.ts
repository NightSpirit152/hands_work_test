export type Shift = {
  id: string;
  logo: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: Array<WorkType>;
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number;
  isPromotionEnabled: boolean;
};

type WorkType = {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}