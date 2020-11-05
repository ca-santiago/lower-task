import { Nullable } from "../../../shared/types";
import { TaskContent } from "./Content";
import { TaskTitle } from "./Tittle";



export interface TaskProps {
  title: TaskTitle;
  content: Nullable<TaskContent>;
  createAt: string;
}

