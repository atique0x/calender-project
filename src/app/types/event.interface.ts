import { StatusEnum } from './status.enum';

export interface EventInterface {
  id: string;
  title: string;
  description: string;
  status: StatusEnum;
  startDate: string;
  endDate: string;
  start?: Date;
  end?: Date;
}
