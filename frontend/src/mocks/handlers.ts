import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:3333/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      ctx.status(200),
      ctx.json({
        token: "token",
        name: "John Doe",
      })
    );
  }),
];

export const allConsultations = rest.get(
  "http://localhost:3333/consultations",
  (req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          patientId: 1,
          date: "Fri Feb 05 2021 10:20:00 GMT-0300 (Brasilia Standard Time)",
          patient: {
            id: 1,
            first_name: "Frodo",
            last_name: "Baggins",
            email: "frodo.baggins@mail.com",
          },
        },
        {
          id: 2,
          patientId: 3,
          date: "Thu Feb 11 2021 09:00:00 GMT-0300 (Brasilia Standard Time)",
          patient: {
            id: 3,
            first_name: "Saruman",
            last_name: "The White",
            email: "saruman.thewhite@mail.com",
          },
        },
        {
          id: 3,
          patientId: 2,
          date: "Thu Feb 11 2021 10:00:00 GMT-0300 (Brasilia Standard Time)",
          patient: {
            id: 2,
            first_name: "Samwise",
            last_name: "Gamgee",
            email: "samwise.gamgee@mail.com",
          },
        },
        {
          id: 4,
          patientId: 3,
          date: "Thu Feb 11 2021 13:00:00 GMT-0300 (Brasilia Standard Time)",
          patient: {
            id: 3,
            first_name: "Saruman",
            last_name: "The White",
            email: "saruman.thewhite@mail.com",
          },
        },
      ])
    );
  }
);

export const emptyConsultations = rest.get(
  "http://localhost:3333/consultations",
  (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]));
  }
);

export const errorConsultations = rest.get(
  "http://localhost:3333/consultations",
  (req, res, ctx) => {
    return res.once(ctx.status(500));
  }
);
