export function processMessage(data: string): string {
  return `Server received: ${data}`;
}

let count = 1;

export function getCount(): number {
  return count;
}

export function getNextCount(): number {
  return ++count;
}
