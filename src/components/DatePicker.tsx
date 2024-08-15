import React, { useState } from "react";
import { Popover, Stack } from "@mui/material";
import { Button } from "@/src/components/Button";
import { DayPicker } from "react-day-picker";

export const DatePicker = ({
  date,
  setDate,
}: {
  date: number | null;
  setDate: (date: number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Stack>
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
        {date ? `📅 ${new Date(date).toLocaleDateString()}` : "📅 Choose date"}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          sx={{
            padding: 2,
          }}
        >
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            footer={
              date
                ? `Selected: ${new Date(date).toLocaleDateString()}`
                : "Pick a day"
            }
          />
        </Stack>
      </Popover>
    </Stack>
  );
};
