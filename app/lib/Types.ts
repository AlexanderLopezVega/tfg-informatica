//  DTOs

//  Used when authentication has been completed (see login/page.tsx)
export interface AuthLoginDTO {
  token: string;
}

export interface SampleDTO {
  ID: string,
  name: string,
  description: string,
  tags: string[],
  publicationStatus: PublicationStatusDTO,
  modelPath: string,
  user: UserDTO,
  collections: CollectionDTO[],

}

export interface SamplePreviewDTO {
  ID: string,
  name: string,
  description: string,
  imageUrl: string,
}

export interface CollectionPreviewDTO {
  ID: string,
  name: string,
  description: string,
  sampleList: Partial<SamplePreviewDTO>[],
}

export interface CollectionDTO {

}

export interface UserDTO {
  userID: number;
}

export interface UserProfileDTO {
  username: string;
}

export interface PublicationStatusDTO {

}

export interface CreateSampleDTO {
  name: string,
  description?: string,
  tags?: string[],
  publicationStatus: number,
  modelID: string
}

// Other
interface ProfileData {
	username: string;
}