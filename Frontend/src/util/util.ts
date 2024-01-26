export const transformImageUrl = (url: string): string | null => {
    const regex = /\/weather\/(\d+x\d+)\/(\w+)\/(\d+)\.png/;
  
    const match = url.match(regex);
  
    if (!match) {
      console.error("Invalid URL format");
      return null;
    }
  
    const [, size, timeOfDay, number] = match;
  
    return `../../../assets/${size}/${timeOfDay}/${number}.png`;
  };
  