import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUsersService } from '../interfaces/IUsersService.interface';
import { Routes, Services } from 'src/utils/consts';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserDto } from '../dto/userDto';

@Controller(Routes.USERS)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    @Inject(Services.Users) private readonly usersService: IUsersService,
  ) {}

  /**
   * Retrieve the information of the authenticated user.
   * @param req The HTTP request object.
   * @returns The user's information.
   */
  @Get(Routes.ME)
  async getMe(@Req() req) {
    return await this.usersService.getUser(req.user.id);
  }

  /**
   * Update the information of the authenticated user, including file uploads.
   * @param req The HTTP request object.
   * @param userDto The user data to be updated.
   * @param images Uploaded avatar and banner files.
   * @returns The updated user information.
   */
  @Patch(Routes.ME)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  async updateUser(
    @Req() req,
    @Body() userDto: UserDto,
    @UploadedFiles()
    images: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    return this.usersService.updateUser(req.user.id, userDto, images);
  }

  /**
   * Retrieve the information of a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns The user's information.
   */
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  /**
   * Check if the authenticated user is logged in.
   * @returns An object indicating the user's logged-in status.
   */
  @Get(Routes.ME + '/is-loggedin')
  isLogged() {
    return { is_logged_in: true };
  }

  /**
   * Check if the authenticated user is verified.
   * @param req The HTTP request object.
   * @returns An object indicating the user's verification status.
   */
  @Get(Routes.ME + '/is-verified')
  async isVerified(@Req() req) {
    return {
      verified: await this.usersService.isVerified(req.user.id),
    };
  }

  /**
   * Search for users based on a query string.
   * @param search_query The query string for user search.
   * @returns An array of users matching the search query.
   */
  @Get('search')
  async search(@Query('s') search_query: string) {
    return await this.usersService.getUsers(search_query);
  }
}
