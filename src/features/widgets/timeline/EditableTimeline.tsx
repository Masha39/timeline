import { Input, Paper, Stack, Checkbox } from "@mui/material";
import { Timeline } from "@/src/features/widgets/timeline/Timeline";
import { StepField, TimelineStep, TimelineWidget } from "./types";
import "react-day-picker/style.css";
import React from "react";
import { DatePicker } from "@/src/components/DatePicker";
import { Button } from "@/src/components/Button";

type EditableTimelineProps = {
  timelineData: TimelineWidget;
  setTimelineData: (timelineData: TimelineWidget) => void;
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
  onStepClick: (index: number) => void;
  onStepChange: (newStepValues: Partial<TimelineStep>) => void;
  currentStep: TimelineStep;
  initialStep: TimelineStep;
};

export const EditableTimeline = ({
  timelineData,
  setTimelineData,
  currentStepIndex,
  setCurrentStepIndex,
  onStepClick,
  onStepChange,
  currentStep,
  initialStep,
}: EditableTimelineProps) => {
  const onAddStep = () => {
    setTimelineData({
      ...timelineData,
      steps: [
        ...timelineData.steps,
        { ...initialStep, id: Math.random().toString() },
      ],
    });
    setCurrentStepIndex(timelineData.steps.length);
  };

  const onDeleteStep = (index: number) => {
    setTimelineData({
      ...timelineData,
      steps: timelineData.steps.filter((_, i) => i !== index),
    });

    setCurrentStepIndex(index === 0 ? 0 : index - 1);
  };

  const onTitleChange = (newTitle) => {
    setTimelineData({
      ...timelineData,
      title: newTitle,
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Stack key={timelineData.id} sx={{ p: "24px", gap: "32px" }}>
        <Input
          disableUnderline={true}
          placeholder="Name your timeline..."
          multiline={true}
          value={timelineData.title}
          onChange={(e) => onTitleChange(e.target.value)}
          sx={{
            border: "none",
            textDecoration: "none",
            fontSize: "32px",
            alignSelf: "center",
            width: "100%",
            p: 0,
          }}
        />

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
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Input
              disableUnderline={true}
              placeholder="Type title here..."
              multiline={true}
              value={currentStep.title}
              onChange={(e) =>
                onStepChange({
                  title: e.target.value,
                })
              }
              sx={{
                border: "none",
                textDecoration: "none",
                fontSize: "24px",
              }}
            />

            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
              <DatePicker
                date={currentStep.dueDate}
                setDate={(date) =>
                  onStepChange({
                    dueDate: date,
                  })
                }
              />

              <Checkbox
                sx={{
                  color: "rgb(7, 5, 76)",
                  "&:hover": {
                    backgroundColor: "rgb(7, 5, 76, 0.05)",
                  },
                }}
                checked={currentStep.completed}
                onChange={() =>
                  onStepChange({
                    completed: !currentStep.completed,
                  })
                }
              />
            </Stack>
          </Stack>
          <Input
            disableUnderline={true}
            placeholder="Description (optional)"
            multiline={true}
            value={currentStep?.description}
            onChange={(e) =>
              onStepChange({
                description: e.target.value,
              })
            }
            sx={{
              border: "none",
              textDecoration: "none",
              fontSize: "18px",
            }}
          />
        </Stack>

        <Stack justifyContent="space-between" flexDirection="row">
          <Button variant="outlined" onClick={() => onAddStep()}>
            Add step
          </Button>

          {timelineData.steps.length > 1 && (
            <Button
              variant="contained"
              onClick={() => onDeleteStep(currentStepIndex)}
            >
              Delete step
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
