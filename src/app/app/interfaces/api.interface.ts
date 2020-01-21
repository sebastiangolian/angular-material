import { Item } from './item.interface';

export interface Api<T extends Item> {
    total_items: number;
    items: T[];
}