import { ViewTransition } from "react";

const StepCounter = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  return (
    <div className="flex justify-end gap-1">
      <ViewTransition name="signup-form-counter-current">
        {current}
      </ViewTransition>
      <span className="text-muted-foreground">of</span>
      <ViewTransition name="signup-form-counter-total">{total}</ViewTransition>
    </div>
  );
};

export { StepCounter };
