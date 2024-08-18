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

export interface CollectionDTO {

}

export interface UserDTO {

}

export interface PublicationStatusDTO {

}