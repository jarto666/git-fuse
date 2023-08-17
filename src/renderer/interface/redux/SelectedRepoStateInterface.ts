import { IRepositoryDetails } from 'shared/interfaces/IRepositoryDetails';
import { CommonStateInterface } from './CommonStateInterface';

export interface SelectedRepoStateInterface extends CommonStateInterface {
  repo?: IRepositoryDetails;
}
