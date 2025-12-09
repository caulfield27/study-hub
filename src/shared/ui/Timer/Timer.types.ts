export interface Props {
  mintes: number;
  seconds: number;
  onTimeOver: () => void;
  startTimerTrigger: boolean;
}