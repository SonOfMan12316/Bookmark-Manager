import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppConfig } from 'src/app.config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);
  private isEmailConfigured = false;

  constructor() {
    const config = AppConfig();
    
    // Only create transporter if email config is provided
    if (config.EMAIL_HOST && config.EMAIL_USERNAME && config.EMAIL_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST as string,
        port: Number(config.EMAIL_PORT),
        secure: false,
        auth: {
          user: config.EMAIL_USERNAME as string,
          pass: config.EMAIL_PASSWORD as string,
        },
      } as nodemailer.TransportOptions);

      // Verify connection asynchronously without blocking startup
      this.verifyConnection().catch((error) => {
        this.logger.warn('Email transporter verification failed. Email functionality may not work.', error.message);
      });
    } else {
      this.logger.warn('Email configuration is missing. Email functionality will be disabled.');
    }
  }

  private async verifyConnection(): Promise<void> {
    if (!this.transporter) return;
    
    try {
      await this.transporter.verify();
      this.isEmailConfigured = true;
      this.logger.log('Email transporter verified successfully');
    } catch (error) {
      this.isEmailConfigured = false;
      this.logger.warn('Email transporter verification failed:', error.message);
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    if (!this.transporter || !this.isEmailConfigured) {
      this.logger.error('Email service is not configured. Cannot send password reset email.');
      throw new InternalServerErrorException('Email service is not available. Please contact support.');
    }

    const config = AppConfig();
    const resetLink = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const emailFrom = (config as any).EMAIL_FROM || config.EMAIL_USERNAME;
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: emailFrom as string,
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
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email: ${error.message}`);
      throw new InternalServerErrorException(`Failed to send password reset email: ${error.message}`);
    }
  }
}
