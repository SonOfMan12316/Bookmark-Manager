import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppConfig } from 'src/app.config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const config = AppConfig();
    this.transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST as string,
      port: Number(config.EMAIL_PORT),
      secure: false,
      auth: {
        user: config.EMAIL_USERNAME as string,
        pass: config.EMAIL_PASSWORD as string,
      },
    } as nodemailer.TransportOptions);

    this.verifyConnection();
  }

  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
    } catch (error) {
      throw new InternalServerErrorException('Email transporter verification failed')
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const config = AppConfig();
    const resetLink = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: config.EMAIL_USERNAME as string,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello,</p>
          <p>You are receiving this email because you (or someone else) have requested a password reset.</p>
          <p>Click the link below to reset your password:</p>
          <p>
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetLink}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };
    
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to send password reset email: ${error.message}`);
    }
  }
}
