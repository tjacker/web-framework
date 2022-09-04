import { IUserProps, User } from '../models/User';
import { BaseCollectionView } from './BaseCollectionView';
import { UserShow } from './UserShow';

export class UserCollectionView extends BaseCollectionView<User, IUserProps> {
  renderItem(model: User, itemParent: HTMLElement): void {
    new UserShow(itemParent, model).render();
  }
}
