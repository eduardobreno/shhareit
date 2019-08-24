class Activity {
  name: string;
  description: string;

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
  }
}

export default Activity;
