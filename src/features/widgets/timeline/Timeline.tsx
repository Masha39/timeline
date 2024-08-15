import { useIsMobileSize } from "@/src/hooks/useIsMobileSize";
import { Stack, SxProps } from "@mui/material";
import { TimelineStep } from "./types";
import { Theme } from "@mui/material/styles/createTheme";
import { CheckIcon } from "@/src/components/icons/CheckIcon";

const Circle = ({ color, filled }: { color: string; filled: boolean }) => (
  <Stack
    sx={{
      height: "40px",
      width: "40px",
      backgroundColor: filled ? color : "transparent",
      border: `3px solid ${color}`,
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {filled && <CheckIcon />}
  </Stack>
);

const Connector = ({ visible }: { visible: boolean }) => (
  <div
    style={{
      height: "3px",
      backgroundColor: "grey",
      marginTop: "18px",
      flex: 1,
      opacity: visible ? 1 : 0,
    }}
  />
);

const slotTitleStyle: Partial<SxProps<Theme>> = {
  position: "absolute",
  left: "50%",
  bottom: "calc(100% + 8px)",
  transform: "translateX(-50%)",
  textWrap: "nowrap",
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "inline-block",
};

// Depending on the viewport size, the timeline will be displayed differently.
// On mobile, the timeline will be displayed as a list of steps.
// On desktop, the timeline will be displayed as a horizontal line with steps.
// Desktop view shows 3 steps at a time, with the current step in the middle.

export const Timeline = ({
  currentStepIndex,
  steps,
  onStepClick,
}: {
  currentStepIndex: number;
  steps: TimelineStep[];
  onStepClick: (index: number) => void;
}) => {
  const isMobile = useIsMobileSize();

  if (isMobile) {
    return (
      <Stack
        sx={{
          gap: "6px",
        }}
      >
        {steps.map((step, index) => {
          let color: string;
          if (step.completed) {
            color = "rgb(7, 5, 76)";
          } else {
            color = "grey";
          }

          return (
            <Stack
              key={step.id}
              sx={{
                alignItems: "center",
                flexDirection: "row",
                gap: "4px",
              }}
              onClick={() => onStepClick(index)}
            >
              <Stack
                sx={{
                  backgroundColor: color,
                  border: "1px solid transparent",
                  borderColor:
                    currentStepIndex === index ? "rgb(7, 5, 76)" : "",
                  borderRadius: "50%",
                  color: "white",
                  height: "24px",
                  width: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {index + 1}
              </Stack>
              <Stack>
                {step.title}{" "}
                {step.dueDate
                  ? `(${new Date(step.dueDate).toLocaleDateString()})`
                  : ""}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    );
  }

  let slots: (TimelineStep | null)[];

  if (currentStepIndex === 0) {
    slots = [
      null,
      steps[currentStepIndex],
      steps[currentStepIndex + 1] ?? null,
    ];
  } else if (currentStepIndex === steps.length - 1) {
    slots = [
      steps[currentStepIndex - 1] ?? null,
      steps[currentStepIndex],
      null,
    ];
  } else {
    slots = [
      steps[currentStepIndex - 1] ?? null,
      steps[currentStepIndex],
      steps[currentStepIndex + 1] ?? null,
    ];
  }

  return (
    <Stack
      sx={{
        alignItems: "start",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "16px",
      }}
    >
      {slots.map((slot, index) => {
        const slotIndex = currentStepIndex + index - 1;

        if (!slot) {
          return (
            <Stack
              key={index}
              sx={{
                flex: 1,
              }}
            />
          );
        }

        let backgroundColor: string;
        if (slot.completed) {
          backgroundColor = "rgb(7, 5, 76)";
        } else if (index === 1) {
          backgroundColor = "rgb(7, 5, 76)";
        } else {
          backgroundColor = "grey";
        }

        return (
          <Stack
            key={slot.id}
            sx={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flex: 1,
              width: "100%",
            }}
          >
            <Connector visible={!!steps[slotIndex - 1]} />

            <Stack
              onClick={() => onStepClick(slotIndex)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                flex: "0 40px",
                marginX: "4px",
                position: "relative",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Circle color={backgroundColor} filled={slot.completed} />
              <Stack sx={{ ...slotTitleStyle }}>{slot.title}</Stack>

              {slot.dueDate && (
                <Stack
                  sx={{
                    ...slotTitleStyle,
                    top: "calc(100% + 8px)",
                    bottom: undefined,
                  }}
                >
                  {new Date(slot.dueDate).toLocaleDateString()}
                </Stack>
              )}
            </Stack>

            {!isMobile && <Connector visible={!!steps[slotIndex + 1]} />}
          </Stack>
        );
      })}
    </Stack>
  );
};
