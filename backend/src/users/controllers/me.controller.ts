import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../services/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * The `MeController` handles user-specific endpoints for checking login status,
 * verifying user status, and managing user profiles.
 */
@ApiTags('User Management')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@Controller()
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Check if the user is logged in.
   * @returns {object} { statusCode: number, is_logged_in: boolean }
   */
  @ApiOperation({ summary: 'Check if the user is logged in' })
  @ApiResponse({
    status: 200,
    description: 'User login status',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        is_logged_in: { type: 'boolean' },
      },
      example: { statusCode: 200, is_logged_in: true },
    },
  })
  @Get('is-loggedin')
  isLogged() {
    return { statusCode: 200, is_logged_in: true };
  }

  /**
   * Check if the user is verified.
   * @returns {object} { statusCode: number, is_verified: boolean }
   */
  @ApiOperation({ summary: 'Check if the user is verified' })
  @ApiResponse({
    status: 200,
    description: 'User verification status',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        is_verified: { type: 'boolean' },
      },
      example: { statusCode: 200, is_verified: true },
    },
  })
  @Get('is-verified')
  isVerified(@Req() req) {
    return this.usersService.isVerified(req.user.id);
  }

  /**
   * Complete user login and update profile information.
   * @param {string} username - The username.
   * @param {string} display_name - The display name.
   * @param {string} avatar - The user's avatar image.
   * @returns {object} User
   */
  @ApiOperation({
    summary: 'Complete user login and update profile information',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        display_name: { type: 'string' },
        avatar: { type: 'file' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user profile information',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        display_name: { type: 'string' },
        profile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            avatar: { type: 'string' },
            about: { type: 'string' },
          },
        },
      },
    },
  })
  @Post('complete-login')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadProfileImage(
    @Req() req,
    @UploadedFile() avatar,
    @Body('username') username: string,
    @Body('display_name') display_name: string,
  ) {
    let profileImageUrl = null;
    if (avatar)
      profileImageUrl = `${this.configService.get('CLIENT_URL')}/avatars/${
        req.user.id
      }/${avatar.filename}`;
    const user = await this.usersService.completeLogin(
      req.user.id,
      username,
      display_name,
      profileImageUrl,
    );

    return user;
  }

  /**
   * Get user profile information.
   * @returns {object} User
   */
  @ApiOperation({ summary: 'Get user profile information' })
  @ApiResponse({
    status: 200,
    description: 'User profile information',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        display_name: { type: 'string' },
        profile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            avatar: { type: 'string' },
            about: { type: 'string' },
          },
        },
      },
    },
  })
  @Get('/')
  async getMe(@Req() req) {
    return await this.usersService.getMe(req.user.id);
  }

  /**
   * Update user's "about" information.
   * @param {string} about - The user's "about" text.
   * @returns {object} User
   */
  @ApiOperation({ summary: 'Update user\'s "about" information' })
  @ApiBody({
    schema: { type: 'object', properties: { about: { type: 'string' } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user profile information',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        display_name: { type: 'string' },
        profile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            avatar: { type: 'string' },
            about: { type: 'string' },
          },
        },
      },
    },
  })
  @Post('about')
  async updateAbout(@Req() req, @Body('about') about: string) {
    const user = await this.usersService.updateAbout(req.user.id, about);
    return user;
  }
}
