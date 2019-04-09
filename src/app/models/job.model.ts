import { Deserializable } from "./deserializable.model";

export class Job implements Deserializable {
  public description: string;
  public startTime: Date;
  public endTime: Date;
  public location: string;
  public position: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
