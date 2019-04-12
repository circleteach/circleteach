import { Deserializable } from "./deserializable.model";

export class Job implements Deserializable {
  public description: string;
  public startTime: string;
  public endTime: string;
  public location: string;
  public position: string;
  public user : string;
  public fieldOfStudy: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
