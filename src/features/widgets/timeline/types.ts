export type TimelineStep = {
  id: string;
  title: string;
  description: string;
  dueDate: number | null;
  completed: boolean;
};

export type TimelineWidget = {
  id: string;
  title: string;
  steps: TimelineStep[];
};

export type StepField = keyof TimelineStep;
