import { blue, green, orange, purple, red } from '@ant-design/colors';

const COLORS = [red[3], green[3], orange[3], purple[3], blue[3]];

export default function createCourseColor(title?: string) {
  if (!title) {
    return '#fff';
  }

  return COLORS[Math.round(title.length % COLORS.length)];
}
