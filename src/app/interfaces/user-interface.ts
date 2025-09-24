export interface User {
  id: string;
  name: string;
  email: string;
  emailVerify: Date | null;
  password: string;
  rol: string;
  image: string | null;
  
}
