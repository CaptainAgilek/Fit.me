import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import nodemailer from 'nodemailer';

export const signin = async (_, { email, password }) => {
  if (!(email === 'a@a.com' && password === 'pass')) {
    throw Error('Invalid username or password');
  }

  const mockUser = { id: 1, email };
  const token = createToken(mockUser);

  return {
    token,
  };
};

export const signup = async (_, { email, password }, { dbConnection }) => {
  const emailTaken = (
    await dbConnection.query('SELECT * FROM user WHERE email = ?', [email])
  )[0];

  if (emailTaken) {
    throw new Error('Email is already registered.');
  }

  const hashedPassword = await argon2.hash(password);
  const verificationToken = createToken({ email: email });

  const insertResponse = await dbConnection.query(
    `INSERT INTO user (user_id, email, password, verification_token, is_verified)
    VALUES (NULL, ?, ?, ?, ?);`,
    [email, hashedPassword, verificationToken, false],
  );

  const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    //
    const info = await transporter.sendMail({
       from: '"Fit.me" <sedm22@vse.cz>', // sender address
       to: email,
       subject: "Hello ✔", // Subject line
       text: "Hello, prosim potvrdte registraci kliknutim na link " + process.env.FRONTEND_URL + "verification?token=" + verificationToken, // plain text body
     });

  const token = createToken({ id: insertResponse.insertId });

  return { token: token };
};
