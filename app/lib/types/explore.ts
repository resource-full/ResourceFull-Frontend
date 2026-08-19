import { Resource } from './resource';
import { Pathway } from './pathway';
import { UserProfile } from './user';
import { Hub } from './hub';

export interface ExploreData {
  resources: Resource[];
  pathways: Pathway[];
  hubs: Hub[];
  creators: UserProfile[]; // Or a simplified Creator interface
}

export interface GetExploreDataResponse {
  success: boolean;
  data: ExploreData;
}
