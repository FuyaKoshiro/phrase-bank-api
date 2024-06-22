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

  it("should convert '&#039;' to '''", () => {
    const input = "This &#039;quoted&#039; text";
    const expected = "This 'quoted' text";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(expected);
  });

  it("should not modify the input if there are no special characters", () => {
    const input = "This is a normal text";
    const result = convertSpecialCharactersToNormal(input);
    expect(result).toEqual(input);
  });
});
