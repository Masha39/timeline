import { Checkbox, Paper, Stack, Typography } from "@mui/material";
import {
  StepField,
  TimelineStep,
  TimelineWidget,
} from "@/src/features/widgets/timeline/types";
import { Timeline } from "@/src/features/widgets/timeline/Timeline";
import React from "react";

type NonEditableTimelineProps = {
  timelineData: TimelineWidget;
  currentStepIndex: number;
  currentStep: TimelineStep;
  onStepClick: (index: number) => void;
  onStepChange: (newStepValues: Partial<TimelineStep>) => void;
};

export const NonEditableTimeline = ({
  timelineData,
  currentStepIndex,
  currentStep,
  onStepClick,
  onStepChange,
}: NonEditableTimelineProps) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <Stack key={timelineData.id} sx={{ p: "24px", gap: "32px" }}>
        <Typography
          variant="h4"
          sx={{ textWrap: "wrap", fontSize: "32px", mt: "3px", mb: "3px" }}
        >
          {timelineData.title || "No title"}
        </Typography>

        <Timeline
          currentStepIndex={currentStepIndex}
          onStepClick={onStepClick}
          steps={timelineData.steps}
        />

        <Stack
          sx={{
            gap: "16px",
            height: "300px",
            p: "16px",
            border: "1px solid #000",
            borderRadius: "8px",
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontSize: "24px", width: "100%" }}>
              {currentStep.title || "No title"}
            </Typography>
            <Checkbox
              checked={currentStep.completed}
              onChange={() =>
                onStepChange({
                  completed: !currentStep.completed,
                })
              }
            />
          </Stack>
          <Typography sx={{ fontSize: "18px" }}>
            {currentStep?.description || "No description"}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
