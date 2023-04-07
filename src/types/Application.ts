import { Accomodation } from "./Accomodation";
import { User } from "./User";

interface ApplicationCore {
  id: number;
  appartementId: number;
  utilisateurId: number;
  date: Date | string;
  statut: string;
}

interface Application {
  id: number;
  appartement: Accomodation;
  utilisateur: User;
  date: string;
  statut: string;
}

interface Applications {
  applications: Application[];
}

export { Application, ApplicationCore, Applications };
