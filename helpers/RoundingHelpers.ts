import { Rounding } from '../components/ListItem';

export const shouldRound = (currentIndex: number, listLength: number) => {
  if (currentIndex !== 0 && listLength > 2) {
    // First Item
    if (currentIndex === 1) {
      return Rounding.Top;
    }
    // Last Item
    else if (currentIndex === listLength - 1) {
      return Rounding.Bottom;
    }
    // Middle Items
    else {
      return Rounding.None;
    }
  }
};
