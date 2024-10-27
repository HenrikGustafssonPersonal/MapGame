interface Guess {
  country: string;
  dist: number;
  lat: number;
  lon: number;
  name: string;
  i: number;
}

interface CreateGameResponse {
  status: string;
  message: string;
  data: any;
}

interface UnfinishedGameResponse {
  status: string;
  message: string;
}
