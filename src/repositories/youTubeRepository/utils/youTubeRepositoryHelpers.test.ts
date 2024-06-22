import { convertSpecialCharactersToNormal } from "./youTubeRepositoryHelpers";

describe("convertSpecialCharactersToNormal", () => {
  it("should convert '&amp;' to '&'", () => {
    const input = "This &amp; that";
    const expected = "This & that";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&lt;' to '<'", () => {
    const input = "This &lt; that";
    const expected = "This < that";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&gt;' to '>'", () => {
    const input = "This &gt; that";
    const expected = "This > that";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&quot;' to '\"'", () => {
    const input = "This &quot;quoted&quot; text";
    const expected = 'This "quoted" text';
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&#39;' to '''", () => {
    const input = "This &#39;quoted&#39; text";
    const expected = "This 'quoted' text";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&amp;' without spaces to '&'", () => {
    const input = "This&amp;that";
    const expected = "This&that";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&lt;' without spaces to '<'", () => {
    const input = "This&lt;that";
    const expected = "This<that";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&gt;' without spaces to '>'", () => {
    const input = "This&gt;that";
    const expected = "This>that";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&quot;' without spaces to '\"'", () => {
    const input = "This&quot;quoted&quot;text";
    const expected = 'This"quoted"text';
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&#39;' without spaces to '''", () => {
    const input = "This&#39;quoted&#39;text";
    const expected = "This'quoted'text";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert '&amp;#39;' without spaces  to '''", () => {
    const input = "This&amp;#39;quoted&amp;#39; text";
    const expected = "This'quoted' text";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert 'S&amp;P' to 'S&P'", () => {
    const input = "S&amp;P 100 hires";
    const expected = "S&P 100 hires";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should convert 'S&amp;amp;P' to 'S&amp;P'", () => {
    const input = "S&amp;amp;P 100 hires";
    const expected = "S&P 100 hires";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should not modify the input if there are no special characters", () => {
    const input = "This is a normal text";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(input);
  });
});
