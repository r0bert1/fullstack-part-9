export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface ExtendedCoursePartBase extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends ExtendedCoursePartBase {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends ExtendedCoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends ExtendedCoursePartBase {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
