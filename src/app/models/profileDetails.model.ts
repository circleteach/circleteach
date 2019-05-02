import { Job } from "./job.model";
import { Deserializable } from "./deserializable.model";

export class ProfileDetails implements Deserializable {
  public certifications: string[];
  public education: Job[];
  public jobHistory: Job[];
  public skills: string[];

  // merging Job object with profileDetails object
  deserialize(input: any): this {
    Object.assign(this, input);
    this.jobHistory = input.jobHistory.map((jobHistory: Job) =>
      new Job().deserialize(jobHistory)
    );
    this.education = input.education.map((education: Job) =>
      new Job().deserialize(education)
    );
    return this;
  }
}
