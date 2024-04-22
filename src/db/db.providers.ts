import { Sequelize } from 'sequelize-typescript';
import { IDatabaseConfigAttributes } from './db.interface';
import { dataBaseConfig } from './db.config';
import { Video } from 'src/models/video.model';
import { Genre } from 'src/models/genre.model';
import { User } from 'src/models/user.model';
import { Sound } from 'src/models/sound.model';
import { Subtitle } from 'src/models/subtitle.model';
import { GenreVideo } from 'src/models/genreVideo.model';
import { Actor } from 'src/models/actor.model';
import { ActorVideo } from 'src/models/actorVideo.model';
import { Country } from 'src/models/country.model';
import { CountryVideo } from 'src/models/coutryVideo.model';
import { Rating } from 'src/models/rating.model';
import { Category } from 'src/models/category.model';
import { PremiumPlan, } from 'src/models/premiumPlans.model';


const config: IDatabaseConfigAttributes = dataBaseConfig.dev;
const databaseUri = `${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseUri, { logging: true });
      sequelize.addModels([
        Video,
        User,
        Genre,
        Sound,
        Subtitle,
        GenreVideo,
        Actor,
        ActorVideo,
        Country,
        CountryVideo,
        Rating,
        Category,
        PremiumPlan

      ]);
      // await sequelize.sync({ force: true });
      await sequelize.sync({ alter: true });
      // await sequelize.sync();
      return sequelize;
    },
  },
];
