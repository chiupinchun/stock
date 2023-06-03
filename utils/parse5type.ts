type HTMLTagName = string;
interface HtmlTree {
  nodeName: "#document" | "#documentType" | "#text" | "#comment" | HTMLTagName; // 標籤名或文字標識
  value: string; // 標籤內文
  attrs: {
    name: string;
    value: string;
  }[];
  childNodes: HtmlTree[];

  tagName: HTMLTagName;
  mode: "no-quirks";
  publicId: string;
  systemId: string;
  namespaceURI: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg";
  prefix: "xmlns";
  namespace: "http://www.w3.org/2000/xmlns/";
  data: " " | " sg3-sdarlaws-023.adx.sg3.yahoo.com Sat Jun 3 12:21:51 UTC 2023 ";
}