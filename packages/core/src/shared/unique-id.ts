import { timestamp } from '../kernel';

export function uniqueId(): string {
  return `${timestamp()}${Math.floor(Math.random() * 10000)}`;
}
