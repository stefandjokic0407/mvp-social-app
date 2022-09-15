import { sendRequestEmail } from '../../utils/mail';

export default (req, res) => {
  const body = JSON.parse(req.body);
  const {
    from,
    to, // array of user emails
    title,
    message,
  } = body;

  const requestLink = `${
    process.env.NEXT_PUBLIC_FRONTEND_URL
  }/create?title=${title.replace(/ /g, '+')}`;

  to.map((toEmail) => {
    sendRequestEmail(toEmail, from, title, message, requestLink);
  });

  res.status(200).json({ status: 'Ok' });
};
