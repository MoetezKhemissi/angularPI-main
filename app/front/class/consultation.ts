import { User } from './user';

export class Consultation {
  
  id_cons?: number;
  motive_cons?: string;
  creationdate_cons?: string;
  status_cons?: boolean;
  code_cons?: number;
  typecons?: string;
  user?: User;

  constructor() {

  }
}