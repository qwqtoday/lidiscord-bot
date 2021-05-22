import { differenceInSeconds } from 'date-fns';

import { CHANNEL_DISCORD_GAMES_TRIVIA } from '../channels';
import { Plugin } from './plugin';

const SECONDS_IN_HOUR = 60 * 60;

const plugin: Plugin = {
  name: 'chat-earner',
  channelExcludes: [CHANNEL_DISCORD_GAMES_TRIVIA],

  async onMessage({ message, user, updateUser }) {
    const secondsSinceLastChat = user.lastEarning
      ? differenceInSeconds(new Date(), user.lastEarning)
      : SECONDS_IN_HOUR;

    const chance = secondsSinceLastChat / SECONDS_IN_HOUR;
    const luck = Math.random();

    if (chance > luck) {
      updateUser({
        ...user,
        lastEarning: new Date(message.createdTimestamp),
        earnings: user.earnings + 10,
        total: user.total + 10,
      });
      console.log(
        new Date().toISOString(),
        `${message.author.username} earnt 10`
      );
    }
  },
};

export default plugin;
