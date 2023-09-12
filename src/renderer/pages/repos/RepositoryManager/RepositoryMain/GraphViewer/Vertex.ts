interface Point {
  x: number;
  y: number;
}

const valueToColorHex = (value: number): string => {
  // Define the number of distinct colors
  const numColors = 10;

  // Calculate the hue value based on the provided value and number of colors
  const hue: number = (value % numColors) * (360 / numColors);

  const hueToRgb = (t: number): number => {
    const p = 0.8;
    const q = 0.2;

    const tfloor = t - Math.floor(t);

    if (tfloor < 1 / 6) return p + (q - p) * 6 * t;
    if (tfloor < 1 / 2) return q;
    if (tfloor < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const r: number = hueToRgb(hue / 360);
  const g: number = hueToRgb(hue / 360 + 1 / 3);
  const b: number = hueToRgb(hue / 360 - 1 / 3);

  // Convert RGB to hex
  const rgbToHex = (red: number, green: number, blue: number): string =>
    `#${Math.round(red * 255)
      .toString(16)
      .padStart(2, '0')}${Math.round(green * 255)
      .toString(16)
      .padStart(2, '0')}${Math.round(blue * 255)
      .toString(16)
      .padStart(2, '0')}`;

  const colorHex: string = rgbToHex(r, g, b);

  return colorHex;
};

class Vertex {
  static readonly OFFSET_X_GAP: number = 5;
  static readonly RADIUS: number = 4;
  static readonly LINE_HEIGHT: number = 20;
  static readonly LEVEL_WIDTH: number = Vertex.OFFSET_X_GAP + Vertex.RADIUS * 2;

  id: string;
  color: string;
  position: Point;
  level: number;

  constructor(level: number, sequence: number, id: string) {
    this.level = level;
    this.color = valueToColorHex(level);
    this.id = id;

    const offsetX = Vertex.OFFSET_X_GAP + level * Vertex.LEVEL_WIDTH;
    const offsetY =
      sequence * Vertex.LINE_HEIGHT + (Vertex.LINE_HEIGHT / 2 - Vertex.RADIUS);
    this.position = { x: offsetX + Vertex.RADIUS, y: offsetY + Vertex.RADIUS };
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) return;

    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      Vertex.RADIUS,
      0,
      Math.PI * 2
    );
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}

export default Vertex;
