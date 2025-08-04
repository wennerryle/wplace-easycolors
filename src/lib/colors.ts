export type RGBArray = [r: number, g: number, b: number];

export interface Color {
  rgb: RGBArray;
  title: string;
}

const colors: Color[] = [
  {
    rgb: [0, 0, 0],
    title: "Black",
  },
  {
    rgb: [60, 60, 60],
    title: "Dark Gray",
  },
  {
    rgb: [120, 120, 120],
    title: "Gray",
  },
  {
    rgb: [170, 170, 170],
    title: "Medium Gray",
  },
  {
    rgb: [210, 210, 210],
    title: "Light Gray",
  },
  {
    rgb: [255, 255, 255],
    title: "White",
  },
  {
    rgb: [96, 0, 24],
    title: "Deep Red",
  },
  {
    rgb: [165, 14, 30],
    title: "Dark Red",
  },
  {
    rgb: [237, 28, 36],
    title: "Red",
  },
  {
    rgb: [250, 128, 114],
    title: "Light Red",
  },
  {
    rgb: [228, 92, 26],
    title: "Dark Orange",
  },
  {
    rgb: [255, 127, 39],
    title: "Orange",
  },
  {
    rgb: [246, 170, 9],
    title: "Gold",
  },
  {
    rgb: [249, 221, 59],
    title: "Yellow",
  },
  {
    rgb: [255, 250, 188],
    title: "Light Yellow",
  },
  {
    rgb: [156, 132, 49],
    title: "Dark Goldenrod",
  },
  {
    rgb: [197, 173, 49],
    title: "Goldenrod",
  },
  {
    rgb: [232, 212, 95],
    title: "Light Goldenrod",
  },
  {
    rgb: [74, 107, 58],
    title: "Dark Olive",
  },
  {
    rgb: [90, 148, 74],
    title: "Olive",
  },
  {
    rgb: [132, 197, 115],
    title: "Light Olive",
  },
  {
    rgb: [14, 185, 104],
    title: "Dark Green",
  },
  {
    rgb: [19, 230, 123],
    title: "Green",
  },
  {
    rgb: [135, 255, 94],
    title: "Light Green",
  },
  {
    rgb: [12, 129, 110],
    title: "Dark Teal",
  },
  {
    rgb: [16, 174, 166],
    title: "Teal",
  },
  {
    rgb: [19, 225, 190],
    title: "Light Teal",
  },
  {
    rgb: [15, 121, 159],
    title: "Dark Cyan",
  },
  {
    rgb: [96, 247, 242],
    title: "Cyan",
  },
  {
    rgb: [187, 250, 242],
    title: "Light Cyan",
  },
  {
    rgb: [40, 80, 158],
    title: "Dark Blue",
  },
  {
    rgb: [64, 147, 228],
    title: "Blue",
  },
  {
    rgb: [125, 199, 255],
    title: "Light Blue",
  },
  {
    rgb: [77, 49, 184],
    title: "Dark Indigo",
  },
  {
    rgb: [107, 80, 246],
    title: "Indigo",
  },
  {
    rgb: [153, 177, 251],
    title: "Light Indigo",
  },
  {
    rgb: [74, 66, 132],
    title: "Dark Slate Blue",
  },
  {
    rgb: [122, 113, 196],
    title: "Slate Blue",
  },
  {
    rgb: [181, 174, 241],
    title: "Light Slate Blue",
  },
  {
    rgb: [120, 12, 153],
    title: "Dark Purple",
  },
  {
    rgb: [170, 56, 185],
    title: "Purple",
  },
  {
    rgb: [224, 159, 249],
    title: "Light Purple",
  },
  {
    rgb: [203, 0, 122],
    title: "Dark Pink",
  },
  {
    rgb: [236, 31, 128],
    title: "Pink",
  },
  {
    rgb: [243, 141, 169],
    title: "Light Pink",
  },
  {
    rgb: [155, 82, 73],
    title: "Dark Peach",
  },
  {
    rgb: [209, 128, 120],
    title: "Peach",
  },
  {
    rgb: [250, 182, 164],
    title: "Light Peach",
  },
  {
    rgb: [104, 70, 52],
    title: "Dark Brown",
  },
  {
    rgb: [149, 104, 42],
    title: "Brown",
  },
  {
    rgb: [219, 164, 99],
    title: "Light Brown",
  },
  {
    rgb: [123, 99, 82],
    title: "Dark Tan",
  },
  {
    rgb: [156, 132, 107],
    title: "Tan",
  },
  {
    rgb: [214, 181, 148],
    title: "Light Tan",
  },
  {
    rgb: [209, 128, 81],
    title: "Dark Beige",
  },
  {
    rgb: [248, 178, 119],
    title: "Beige",
  },
  {
    rgb: [255, 197, 165],
    title: "Light Beige",
  },
  {
    rgb: [109, 100, 63],
    title: "Dark Stone",
  },
  {
    rgb: [148, 140, 107],
    title: "Stone",
  },
  {
    rgb: [205, 197, 158],
    title: "Light Stone",
  },
  {
    rgb: [51, 57, 65],
    title: "Dark Slate",
  },
  {
    rgb: [109, 117, 141],
    title: "Slate",
  },
  {
    rgb: [179, 185, 209],
    title: "Light Slate",
  },
];

function getColorDistanceSquared(color: RGBArray, color2: RGBArray): number {
  let res = 0;

  for (let i = 0; i < 3; i++) {
    res += Math.pow(color[i] - color2[i], 2);
  }

  return res;
}

export function getNearestColor(rgb: RGBArray): Color {
  // https://en.wikipedia.org/wiki/Color_difference
  // smaller is nearer
  let currentNearest = 0;
  let currentDistance = getColorDistanceSquared(
    rgb,
    colors[currentNearest].rgb
  );

  for (let i = 1; i < colors.length; i++) {
    const distance = getColorDistanceSquared(rgb, colors[i].rgb);

    if (currentDistance > distance) {
      currentNearest = i;
      currentDistance = distance;
    }
  }

  return colors[currentNearest];
}

export function hex2color(hex: string): RGBArray | null {
  const cleanedHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanedHex.length === 3) {
    const r = parseInt(cleanedHex[0] + cleanedHex[0], 16);
    const g = parseInt(cleanedHex[1] + cleanedHex[1], 16);
    const b = parseInt(cleanedHex[2] + cleanedHex[2], 16);
    return [r, g, b];
  }

  if (cleanedHex.length === 6) {
    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);
    return [r, g, b];
  }

  return null;
}

export function rgb2color(color: string): RGBArray | null {
  try {
    return color
      .split(",")
      .map((it) => it.match(/\d+/gm)![0]) as unknown as RGBArray;
  } catch (_) {
    return null;
  }
}
