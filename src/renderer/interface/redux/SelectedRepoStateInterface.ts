import { IRepositoryDetails } from '../IRepositoryDetails';
import { CommonStateInterface } from './CommonStateInterface';

export interface SelectedRepoStateInterface extends CommonStateInterface {
  repo?: IRepositoryDetails;
}
