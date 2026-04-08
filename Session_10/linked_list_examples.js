class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function buildLinkedList(values) {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i += 1) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}

function toArray(head) {
  const result = [];
  let current = head;

  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }

  return result;
}

function prepend(head, value) {
  const newNode = new ListNode(value);
  newNode.next = head;
  return newNode;
}

function removeHead(head) {
  if (head === null) return null;
  return head.next;
}

function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev;
}

const list = buildLinkedList([10, 20, 30, 40]);
console.log("Original:", toArray(list));

const withPrepended = prepend(list, 5);
console.log("After prepend:", toArray(withPrepended));

const afterRemoveHead = removeHead(withPrepended);
console.log("After remove head:", toArray(afterRemoveHead));

const middle = middleNode(afterRemoveHead);
console.log("Middle node value:", middle ? middle.value : null);

const reversed = reverseList(afterRemoveHead);
console.log("Reversed:", toArray(reversed));
