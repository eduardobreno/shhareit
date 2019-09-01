class User {
  id: string;
  displayName: string;
  photoURL: string;
  bio: string;
  username: string;
  email: string;
  metadata: string;

  constructor({
    id,
    displayName,
    photoURL,
    bio,
    username,
    email,
    metadata
  }: any = {}) {
    this.id = id;
    this.displayName = displayName || undefined;
    this.photoURL = photoURL || undefined;
    this.bio = bio || undefined;
    this.username = username || undefined;
    this.email = email;
    this.metadata = metadata;
  }
}

export default User;
