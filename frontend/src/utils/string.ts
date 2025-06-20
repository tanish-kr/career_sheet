export const convertBr = (str: string) => {
  return str?.replace(/\r?\n/g, "<br>");
}
