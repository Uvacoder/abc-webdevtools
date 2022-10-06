export default function saveFile(fileContentDataURL: string, name: string) {
  const el = document.createElement("a");
  el.href = fileContentDataURL;
  el.download = name;
  el.style.opacity = "0";
  document.body.append(el);
  el.click();
  el.remove();
}
