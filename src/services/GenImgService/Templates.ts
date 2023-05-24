export default class Templates {
  text: string;
  width: number;
  height: number;

  getSvgText: Function;

  constructor(text: string, width: number, height: number) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.getSvgText = () => {
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <text x="50%" y="50%" text-anchor="middle" font-family="Arial" 
            font-size="${
              (width as number) / 10
            }" style=" font-weight: bold; fill: white; stroke: black; stroke-width: 2;">
              ${text}
        </text>
      </svg>`;
    };
  }
}
