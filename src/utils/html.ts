// html 编码（转义）
export function htmlEncode(str: string) {
    var temp = "";
    if (str.length == 0) return "";
    temp = str.replace(/&/g, "&amp;");
    temp = temp.replace(/</g, "&lt;");
    temp = temp.replace(/>/g, "&gt;");
    temp = temp.replace(/\s/g, "&nbsp;");
    temp = temp.replace(/\'/g, "&#39;");
    temp = temp.replace(/\"/g, "&quot;");
    return temp;
}

// html编码（反转义）
export function htmlDecode(str: string) {
    var temp = "";
    if (str.length == 0) return "";
    temp = str.replace(/&amp;/g, "&");
    temp = temp.replace(/&lt;/g, "<");
    temp = temp.replace(/&gt;/g, ">");
    temp = temp.replace(/&nbsp;/g, " ");
    temp = temp.replace(/&#39;/g, "\'");
    temp = temp.replace(/&quot;/g, "\"");
    return temp;
}