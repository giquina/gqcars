import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
    name?: string;
    email?: string;
    phone?: string;
  }
  
  interface Session {
    user?: User;
  }
}