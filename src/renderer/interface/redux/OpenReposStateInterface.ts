import { IRepository } from '../../../shared/interfaces/IRepository';
import { CommonStateInterface } from './CommonStateInterface';

export interface OpenReposStateInterface extends CommonStateInterface {
  repos: Array<IRepository>;
  selectedRepository?: IRepository;
}
