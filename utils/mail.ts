import SMTPTransport, { createTransport, getTestMessageUrl } from 'nodemailer';
import prisma from '../prisma/client';

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as SMTPTransport.SendMailOptions);

function welcomeEmailTemplate(text: string): string {
  return `
		<div style="
			border: 1px solid black;
			font-family: sans-serif;
			font-size: 20px;
			line-height: 2;
			padding: 20px;
		">
			<h2>Hello There!</h2>
			<p>${text}</p>
		</div>
	`;
}

function requestEmailTemplate(
  to: string,
  from: string,
  title: string,
  message: string,
  requestLink: string
): string {
  return `
  <!DOCTYPE html>

  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

  <head>
    <title>Totym Request</title>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit
      }

      @media (max-width:520px) {
        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .row-content {
          width: 100% !important;
        }

        .image_block img.big {
          width: auto !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }
      }
    </style>
  </head>

  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
      <tbody>
        <tr>
          <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img alt="totym full logo" class="big"
                                      src="https://res.cloudinary.com/di9t1lu8j/image/upload/v1642478333/logos/TYM-Logo-Tagline-whitebg-social-share_xcul5m.jpg"
                                      style="display: block; height: auto; border: 0; max-width: 300px; width: 100%;"
                                      width="300" /></div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                              <tr>
                                <td>
                                  <div style="font-family: sans-serif">
                                    <div
                                      style="font-size: 14px; mso-line-height-alt: 16.8px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                      <p style="margin: 0; font-size: 14px;">Hey, ${to}</p>
                                      <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"> </p>
                                      <p style="margin: 0; font-size: 14px;">You've received a Totym request from ${from} for
                                        ${title}. </p>
                                      <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"> </p>
                                      <p style="margin: 0; font-size: 14px; margin-left: 40px;">"${message}"</p>
                                      <p style="margin: 0; font-size: 14px; margin-left: 80px;">- ${from}</p>
                                      <p
                                        style="margin: 0; font-size: 14px; margin-left: 80px; mso-line-height-alt: 16.8px;">
                                         </p>
                                      <p style="margin: 0; font-size: 14px;">By fulfilling the request, you'll help guide
                                        ${from} and others on Totym to ${title}. <a href="${requestLink}"  style="color: #EE542F" target="_blank">Click here</a> to get started.</p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
														<tr>
															<td style="padding-top:70px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
																<div style="font-family: sans-serif">
																	<div
																		style="font-size: 14px; mso-line-height-alt: 16.8px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
																		<p style="margin: 0; font-size: 14px; text-align: center;">Want inspiration? Explore
																			<a href="https://beta.totym.com" style="color: #EE542F" target="_blank">Totym</a>.</p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
                            <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img alt="totym small logo" class="small"
                                      src="https://res.cloudinary.com/di9t1lu8j/image/upload/v1624907478/totym-square.png"
                                      style="display: block; width: 100%;
                                      max-width: 69px;
                                      border: 0;
                                      border-radius: 50%;
                                      max-height: 69px;"
                                    /></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>

  </html>
	`;
}


function contactEmailTemplate(
  from: string,
  message: string,
): string {
  return `
  <!DOCTYPE html>

  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

  <head>
    <title>Totym Request</title>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit
      }

      @media (max-width:520px) {
        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .row-content {
          width: 100% !important;
        }

        .image_block img.big {
          width: auto !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }
      }
    </style>
  </head>

  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
      <tbody>
        <tr>
          <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img alt="totym full logo" class="big"
                                      src="https://res.cloudinary.com/di9t1lu8j/image/upload/v1642478333/logos/TYM-Logo-Tagline-whitebg-social-share_xcul5m.jpg"
                                      style="display: block; height: auto; border: 0; max-width: 300px; width: 100%;"
                                      width="300" /></div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                              <tr>
                                <td>
                                  <div style="font-family: sans-serif">
                                    <div
                                      style="font-size: 14px; mso-line-height-alt: 16.8px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                      <h2 style="margin: 0; font-size: 24px; text-align: center;">Contact Submission</h2>
                                      <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"> </p>
                                      <p style="margin: 0; font-size: 14px;">You've received a Totym contact submission from ${from}. </p>
                                      <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"> </p>
                                      <p style="margin: 0; font-size: 14px; margin-left: 40px;">"${message}"</p>
                                      <p style="margin: 0; font-size: 14px; margin-left: 80px;">- ${from}</p>
                                      <p
                                        style="margin: 0; font-size: 14px; margin-left: 80px; mso-line-height-alt: 16.8px;">
                                         </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
														<tr>
															<td style="padding-top:70px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
																<div style="font-family: sans-serif">
																	<div
																		style="font-size: 14px; mso-line-height-alt: 16.8px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
																		<p style="margin: 0; font-size: 14px; text-align: center;">Want inspiration? Explore
																			<a href="https://beta.totym.com" style="color: #EE542F" target="_blank">Totym</a>.</p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
                            <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tr>
                                <td style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div align="center" style="line-height:10px"><img alt="totym small logo" class="small"
                                      src="https://res.cloudinary.com/di9t1lu8j/image/upload/v1624907478/totym-square.png"
                                      style="display: block; width: 100%;
                                      max-width: 69px;
                                      border: 0;
                                      border-radius: 50%;
                                      max-height: 69px;"
                                    /></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>

  </html>
	`;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  const info = (await transport.sendMail({
    // to: to,
    to: 'chrisrb83@gmail.com', // remove cb email after testing
    from: 'info@totym.com',
    subject: 'Welcome to Totym',
    html: welcomeEmailTemplate(`Thanks for signing up, ${to}!`),
  })) as SMTPTransport.SentMessageInfo;

  if (process.env.SMTP_USER?.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}

export async function sendRequestEmail(
  to: string,
  from: string,
  title: string,
  message: string,
  requestLink: string
): Promise<void> {
  const toUser = await prisma.user.findUnique({
    where: { email: to },
  });
  const info = (await transport.sendMail({
    to: toUser.email,
    // to: 'chrisrb83@gmail.com', // remove cb email after testing
    from: 'info@totym.com',
    subject: `Request from ${from} - ${title}`,
    html: requestEmailTemplate(toUser.name, from, title, message, requestLink),
  })) as SMTPTransport.SentMessageInfo;

  if (process.env.SMTP_USER?.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}

export async function sendContactEmail(
  from: string,
  message: string,
): Promise<void> {
  const toList = ['chrisrb83@gmail.com', 'was.alexm@gmail.com', 'baldrich.uofm@gmail.com']
  const info = (await transport.sendMail({
    to: toList,
    from: 'info@totym.com',
    subject: `Contact form submission from ${from}`,
    html: contactEmailTemplate(from, message),
  })) as SMTPTransport.SentMessageInfo;

  if (process.env.SMTP_USER?.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}