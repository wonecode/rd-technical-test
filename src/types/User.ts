interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface Users {
  utilisateurs: User[];
}

export { User, Users };