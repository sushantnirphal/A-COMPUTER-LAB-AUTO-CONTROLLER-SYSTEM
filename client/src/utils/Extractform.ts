export default function extractFormData(form: HTMLFormElement) {
  const payload: {[k: string]: string | number | null} = {};
  const formdata = new FormData(form);
  for (let key of formdata.keys()) {
    payload[key] = formdata.get(key) as string;
  }
  return payload;
}
