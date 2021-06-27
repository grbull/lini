import Axios from 'axios';

import { AuthLoginDto, AuthValidateDto } from '../../server/auth/auth.dto';
import {
  EpisodeDto,
  EpisodeScheduleDto,
} from '../../server/episode/episode.dto';
import { PushSubscriptionCreateDto } from '../../server/push_subscription/push_subscription.dto';
import { ShowDto, ShowWithEpisodesDto } from '../../server/show/show.dto';
import {
  SubscriptionCreateDto,
  SubscriptionDto,
  SubscriptionRemoveDto,
  // SubscriptionUpdateDto,
} from '../../server/subscription/subscription.dto';
import { UserDto, UserUpdateDto } from '../../server/user/user.dto';

const axios = Axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

async function userLogin(loginDto: AuthLoginDto): Promise<void> {
  await axios.post<void>('auth/login', loginDto);
}

async function userValidate(validateDto: AuthValidateDto): Promise<UserDto> {
  const response = await axios.post<UserDto>('auth/validate', validateDto);
  return response.data;
}

async function userGet(): Promise<UserDto> {
  const response = await axios.get<UserDto>('user');
  return response.data;
}

async function userUpdate(updateDto: UserUpdateDto): Promise<UserDto> {
  const response = await axios.put<UserDto>('user', updateDto);
  return response.data;
}

async function showSearch(query: string): Promise<ShowDto[]> {
  const response = await axios.get<ShowDto[]>(`show/search/${query}`);
  return response.data;
}

async function showGet(id: number): Promise<ShowWithEpisodesDto> {
  const response = await axios.get<ShowWithEpisodesDto>(`show/${id}`);
  return response.data;
}

async function episodeGet(id: number): Promise<EpisodeDto> {
  const response = await axios.get<EpisodeDto>(`episode/${id}`);
  return response.data;
}

async function episodeGetByShow(id: number): Promise<EpisodeDto[]> {
  const response = await axios.get<EpisodeDto[]>(`episode/show/${id}`);
  return response.data;
}

async function subscriptionGetAll(): Promise<SubscriptionDto[]> {
  const response = await axios.get<SubscriptionDto[]>('subscription/all');
  return response.data;
}

async function subscriptionCreate(
  createDto: SubscriptionCreateDto
): Promise<SubscriptionDto> {
  const response = await axios.post<SubscriptionDto>('subscription', createDto);
  return response.data;
}

// async function subscriptionUpdate(
//   updateDto: SubscriptionUpdateDto
// ): Promise<SubscriptionDto> {
//   const response = await axios.put<SubscriptionDto>('subscription', updateDto);
//   return response.data;
// }

async function subscriptionRemove(
  removeDto: SubscriptionRemoveDto
): Promise<SubscriptionDto> {
  const response = await axios.delete<SubscriptionDto>('subscription', {
    data: removeDto,
  });
  return response.data;
}

async function episodeScheduleGet(): Promise<EpisodeScheduleDto> {
  const response = await axios.get<EpisodeScheduleDto>('episode/schedule');
  return response.data;
}

async function pushCreate(createDto: PushSubscriptionCreateDto): Promise<void> {
  await axios.post('push_subscription', createDto);
}

export const api = {
  user: {
    login: userLogin,
    validate: userValidate,
    get: userGet,
    update: userUpdate,
  },
  show: {
    search: showSearch,
    get: showGet,
  },
  episode: {
    get: episodeGet,
    getByShow: episodeGetByShow,
    getSchedule: episodeScheduleGet,
  },
  subscription: {
    getAll: subscriptionGetAll,
    create: subscriptionCreate,
    // update: subscriptionUpdate,
    remove: subscriptionRemove,
  },
  push: {
    create: pushCreate,
  },
};
