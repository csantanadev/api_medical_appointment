import { IMailProvider, MailDTO } from "../mail.provider";
import nodemailer, { Transporter } from "nodemailer";

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter; // O  '!' fala para o ts que ele nao se preocupe que essa variavel vai ter valor e não sera undefined

  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "tania.murphy57@ethereal.email",
            pass: "sePwdwgHzqQs3wm35C",
          },
        });
        this.client = transporter;
      })
      .catch((e) => console.log(e));
  }

  async sendMail(data: MailDTO): Promise<void> {
    const resultEmail = await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log("Message sent: %s", resultEmail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(resultEmail));
  }
}
