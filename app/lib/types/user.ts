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

export interface UserProfile {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
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
  experienceLevel?: string;
  currentGoals?: string;
  primaryGoal?: string;
  goalTimeline?: string[];
  experiences?: any[];
  avatar?: string;
  coverPhoto?: string;
  [key: string]: any; // Allow other fields to be updated if needed
}

export interface UpdateUserProfileResponse {
  success: boolean;
  message?: string;
  data: UserProfile;
}
