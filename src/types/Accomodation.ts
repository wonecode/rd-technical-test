interface Accomodation {
  id: number;
  type: string;
  adresse: string;
  cp: string;
  ville: string;
  prix: number;
  superficie: number;
  nb_pieces: number;
  description: string;
  image: string;
}

interface Accomodations {
  accomodations: Accomodation[];
}

export { Accomodation, Accomodations };
