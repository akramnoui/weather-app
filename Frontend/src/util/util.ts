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

  export const daytimeColors = ['#87CEEB', '#6BB7CE', '#3AD', '#00BFFF', '#00A5D6'];
  export const nighttimeColors = ['#001F3F', '#002B4D', '#003366', '#001F33', '#001522'];
  
  