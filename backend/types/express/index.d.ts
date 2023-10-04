import { SystemClientEntity } from 'src/app/entities/SystemClient.entity';
import { UserEntity } from 'src/app/entities/User.entity';

declare global {
  namespace Express {
    interface Request {
      systemClient: SystemClientEntity;
      user: UserEntity;
    }
  }
}
