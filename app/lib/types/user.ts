export interface UserProfileStats {
  following: number;
  followers: number;
  totalCreated: number;
  totalSold: number;
  avgRelevancyScore: number;
}

export interface UserProfileSocials {
  instagram: string;
  x: string;
  linkedin: string;
  facebook: string;
}

/** A resource/pathway/hub as embedded directly on the user profile payload.
 *  Lighter than the dedicated /resources, /pathways, /hubs endpoints, but
 *  has everything the profile tabs' tables need — and unlike
 *  /pathways/:id and /pathways/user/my, its pathway items carry a real
 *  populated `name` instead of a stale null `title`. */
export interface UserProfileItem {
  _id: string;
  name: string;
  description: string;
  coverPhoto?: string;
  status: 'draft' | 'public' | 'private';
  applicableLocation: string;
  experience: string;
  industry: string;
  isFree: boolean;
  price: number;
  currency: string;
  viewCount: number;
  downloadCount?: number;
  blocks?: { type: string; order: number; name: string; shortDescription: string; resource?: string }[];
  resources?: string[];
  pathways?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileDraftOrPrivateItem extends UserProfileItem {
  itemType: 'Resource' | 'Pathway' | 'Hub';
}

export interface UserProfile {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username?: string;
  email: string;
  role: string;
  authProvider: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  onboardingStep: number;
  professionalExperience: string;
  currentRole: string;
  roleLocation: string;
  avatar: string;
  coverImage: string;
  position: string;
  shortDescription: string;
  industry: string;
  location: string;
  currentCareer: string;
  projectedCareer: string;
  skills: string[];
  bio: string;
  primaryCareerGoal: string;
  targetRoles: string[];
  goalReviewTimeline: string;
  savedResources: any[];
  createdResources: any[];
  followers: any[];
  following: any[];
  profileStatus: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  stats: UserProfileStats;
  socials: UserProfileSocials;
  /** All of the user's own resources/pathways/hubs regardless of status,
   *  plus `drafts`/`onlyMe` pre-filtered the same way by the backend. */
  resources?: UserProfileItem[];
  pathways?: UserProfileItem[];
  hubs?: UserProfileItem[];
  drafts?: UserProfileDraftOrPrivateItem[];
  onlyMe?: UserProfileDraftOrPrivateItem[];
}

export interface GetUserProfileResponse {
  success: boolean;
  message?: string;
  data: UserProfile;
}

export interface UpdateUserProfilePayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  location?: string;
  currentCareer?: string;
  skills?: string[];
  bio?: string;
  industry?: string;
  professionalExperience?: string;
  currentGoals?: string;
  primaryCareerGoal?: string;
  goalReviewTimeline?: string;
  experiences?: any[];
  avatar?: string;
  coverImage?: string;
  [key: string]: any; // Allow other fields to be updated if needed
}

export interface UpdateUserProfileResponse {
  success: boolean;
  message?: string;
  data: UserProfile;
}
