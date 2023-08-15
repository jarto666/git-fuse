import { IRepository } from '../IRepository';
import { CommonStateInterface } from './CommonStateInterface';

export interface SelectedRepoStateInterface extends CommonStateInterface {
  repo?: IRepository;
}
