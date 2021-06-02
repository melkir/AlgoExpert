import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function removeDuplicatesFromLinkedList(linkedList: LinkedList) {
  let currentNode: LinkedList | null = linkedList;
  while (currentNode.next !== null) {
    if (currentNode.value === currentNode.next.value) {
      while (currentNode.value === currentNode.next?.value) {
        currentNode.next = currentNode?.next?.next ?? null;
      }
    } else {
      currentNode = currentNode.next;
    }
  }
  return linkedList;
}

const input = addMany(new LinkedList(1), [1, 3, 4, 4, 4, 5, 6, 6]);
const expected = addMany(new LinkedList(1), [3, 4, 5, 6]);

function addMany(linkedList: LinkedList, values: number[]) {
  let current = linkedList;
  while (current.next !== null) {
    current = current.next;
  }
  for (const value of values) {
    current.next = new LinkedList(value);
    current = current.next;
  }
  return linkedList;
}

const result = removeDuplicatesFromLinkedList(input);
console.log(JSON.stringify(result, null, 2));

Deno.test({
  name: "test algorithm",
  fn: () => {
    assertEquals(result, expected);
  },
});
