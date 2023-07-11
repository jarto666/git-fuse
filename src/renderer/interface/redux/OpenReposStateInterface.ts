import { IRepository } from '../IRepository';
import { CommonStateInterface } from './CommonStateInterface';

export interface OpenReposStateInterface extends CommonStateInterface {
  repos: Array<IRepository>;
}
