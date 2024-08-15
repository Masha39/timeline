"use client";
import { Stack } from "@mui/material";
import { useState } from "react";
import {
  StepField,
  TimelineStep,
  TimelineWidget,
} from "@/src/features/widgets/timeline/types";
import { EditableTimeline } from "@/src/features/widgets/timeline/EditableTimeline";
import { NonEditableTimeline } from "@/src/features/widgets/timeline/NonEditableTimeline";
import { useIsMobileSize } from "@/src/hooks/useIsMobileSize";
import { Button } from "@/src/components/Button";

const initialStep: TimelineStep = {
  id: Math.random().toString(),
  title: "",
  description: "",
  dueDate: null,
  completed: false,
};

const initialTimeline: TimelineWidget = {
  id: Math.random().toString(),
  title: "",
  steps: [initialStep],
};

export default function Page() {
  const [isEditable, setIsEditable] = useState(true);
  const [timelineWidget, setTimelineWidget] = useState(initialTimeline);
  const [showTimelineWidget, setShowTimelineWidget] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = timelineWidget.steps[currentStepIndex];

  const isMobile = useIsMobileSize();

  const onStepChange = (newStepValues: Partial<TimelineStep>) => {
    setTimelineWidget({
      ...timelineWidget,
      steps: timelineWidget.steps.map((step, i) =>
        i === currentStepIndex ? { ...step, ...newStepValues } : step,
      ),
    });
  };

  const onStepClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1000px",
        mx: "auto",
        my: "64px",
        gap: "32px",
      }}
    >
      {!showTimelineWidget && (
        <Button onClick={() => setShowTimelineWidget(true)} variant="contained">
          Add timeline widget
        </Button>
      )}

      {!isMobile && isEditable && showTimelineWidget ? (
        <Button
          onClick={() => setIsEditable(false)}
          sx={{
            alignSelf: "flex-end",
          }}
          variant="contained"
        >
          Preview
        </Button>
      ) : (
        !isMobile &&
        showTimelineWidget && (
          <Button
            onClick={() => setIsEditable(true)}
            sx={{ alignSelf: "flex-end" }}
            variant="contained"
          >
            Edit
          </Button>
        )
      )}

      {isEditable && showTimelineWidget && !isMobile ? (
        <EditableTimeline
          timelineData={timelineWidget}
          setTimelineData={setTimelineWidget}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
          onStepClick={onStepClick}
          onStepChange={onStepChange}
          currentStep={currentStep}
          initialStep={initialStep}
        />
      ) : (
        showTimelineWidget && (
          <NonEditableTimeline
            currentStepIndex={currentStepIndex}
            currentStep={currentStep}
            onStepClick={onStepClick}
            onStepChange={onStepChange}
            timelineData={timelineWidget}
          />
        )
      )}
    </Stack>
  );
}
