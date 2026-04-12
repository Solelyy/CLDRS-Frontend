# Guide for backend devs na malupet

1. Set up ng .env file sa root folder
ex:
VITE_API_URL=http://localhost:3001 (palitan mo na lng ng kung anong port nag rrun backend)
NODE_ENV= development

2. Locate this file: getUserSession.ts 
CLDRS-Frontend/app/lib/server/getUserSession.ts
paki-comment mo ung proxy user tas may isa ka pa iccomment, check mo na lang mga comments ko

3. Connect the endpoint ng login, 
- locate the file: app/features/auth/api/loginApi.ts
- read the comments 

4. Connect yung endpoint para makuha ung user base sa cookie,
- locate this file: app/lib/server/getUserSession.ts

5. then try mo na i-login. (syempre may backend na dapat at database)

note: kailangan ko sa login api (backend) is pag valid credentials, sinasauli na rin yung user. (role, employeeId, firstname, lastname) that is exact naming.

shape ng user:
  role: UserRole;
  employeeId: string;
  firstname: string;
  lastname: string;

UserRole: enum to
enum UserRole {
  LAB_ADMIN = "ADMIN",
  LAB_ASSISTANT = "LAB_ASSISTANT",
  LAB_TECHNICIAN = "LAB_TECHNICIAN"
}

# para sa mga frontend devs na malupiet, 
1. may proxy user tayo located sa app/lib/server/getUserSession.ts
kayo na bahala baguhin kung anong user role para kung may iaccess kayo na role based. ex sa dashboard ng admin: http://localhost:5173/lab-admin

2. check routes here: app/routes.ts