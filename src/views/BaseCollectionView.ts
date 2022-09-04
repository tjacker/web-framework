import { BaseCollection } from '../models/BaseCollection';

export abstract class BaseCollectionView<T, K> {
  abstract renderItem(model: T, itemParent: HTMLElement): void;

  constructor(public parent: HTMLElement, public collection: BaseCollection<T, K>) {}

  render(): void {
    const templateElement = document.createElement('template');

    this.parent.innerHTML = '';

    for (const model of this.collection.models) {
      const itemParent = document.createElement('div');

      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
