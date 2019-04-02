import { Time } from "@angular/common";
import { Job } from "./job.model";

export class ProfileDetails {
  public certifications: string[];
  public education: Job[];
  public jobHistory: Job[];
  public skills: string[];
}
