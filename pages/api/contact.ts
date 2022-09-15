import { sendContactEmail } from '../../utils/mail';

export default (req, res) => {
  const body = JSON.parse(req.body);
  const {
    from,
    message,
  } = body;

  sendContactEmail(from, message);

  res.status(200).json({ status: 'Ok' });
};
