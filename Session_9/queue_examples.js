"use strict";

/**
 * Session 9 — Queue (FIFO) Examples
 *
 * Run: node queue_examples.js
 *
 * Nội dung:
 * 1. Queue cơ bản — hàng đợi trà sữa
 * 2. Number of Recent Calls (LeetCode 933)
 * 3. Implement Queue using Stacks (LeetCode 232)
 * 4. First Unique Character (LeetCode 387)
 */

// ============================================================
// 1. QUEUE CƠ BẢN — HÀNG ĐỢI TRÀ SỮA
// ============================================================

function runBasicQueueDemo() {
  console.log("=== 1. Queue Cơ Bản: Hàng Đợi Trà Sữa ===\n");

  const queue = [];

  // Khách xếp hàng (enqueue)
  queue.push("Khách An");
  queue.push("Khách Bình");
  queue.push("Khách Chi");
  console.log("Hàng đợi:", queue);
  // → ["Khách An", "Khách Bình", "Khách Chi"]

  // Phục vụ từng khách (dequeue)
  while (queue.length > 0) {
    const served = queue.shift();
    console.log("  Phục vụ:", served);
  }
  // Phục vụ: Khách An   ← vào đầu tiên, ra đầu tiên
  // Phục vụ: Khách Bình
  // Phục vụ: Khách Chi

  console.log("Hàng đợi sau khi phục vụ hết:", queue);
  console.log();
}

// ============================================================
// 2. NUMBER OF RECENT CALLS (LeetCode 933)
// ============================================================
//
// Đề: Đếm số request trong 3000ms gần nhất.
//
// Tại sao Queue?
// - Request cũ nhất nằm ở đầu.
// - Khi quá cũ → loại ra.
// - Giữ đúng thứ tự thời gian.

function recentCounter() {
  const queue = [];

  return function ping(t) {
    // Thêm request mới vào cuối
    queue.push(t);

    // Loại bỏ request quá cũ ở đầu
    while (queue[0] < t - 3000) {
      queue.shift();
    }

    return queue.length;
  };
}

function runRecentCallsDemo() {
  console.log("=== 2. Number of Recent Calls (LC 933) ===\n");

  const counter = recentCounter();

  const tests = [1, 100, 3001, 3002];
  for (const t of tests) {
    const result = counter(t);
    console.log(`  ping(${t}) → ${result} requests trong 3000ms`);
  }
  // ping(1)    → 1
  // ping(100)  → 2
  // ping(3001) → 3
  // ping(3002) → 3 (request t=1 bị loại vì 1 < 3002-3000=2)
  console.log();
}

// ============================================================
// 3. IMPLEMENT QUEUE USING STACKS (LeetCode 232)
// ============================================================
//
// Đề: Dùng 2 Stack để tạo Queue.
//
// Ý tưởng:
// - inbox (stack 1): nhận phần tử mới
// - outbox (stack 2): phục vụ phần tử cũ
// - Khi outbox rỗng → đổ inbox sang outbox (đảo ngược thứ tự)

function createQueueFromStacks() {
  const inbox = [];
  const outbox = [];

  function enqueue(item) {
    inbox.push(item);
  }

  function dequeue() {
    if (outbox.length === 0) {
      while (inbox.length > 0) {
        outbox.push(inbox.pop());
      }
    }
    return outbox.pop();
  }

  function peek() {
    if (outbox.length === 0) {
      while (inbox.length > 0) {
        outbox.push(inbox.pop());
      }
    }
    return outbox[outbox.length - 1];
  }

  function isEmpty() {
    return inbox.length === 0 && outbox.length === 0;
  }

  return { enqueue, dequeue, peek, isEmpty };
}

function runQueueFromStacksDemo() {
  console.log("=== 3. Queue from 2 Stacks (LC 232) ===\n");

  const q = createQueueFromStacks();

  q.enqueue("A");
  q.enqueue("B");
  q.enqueue("C");
  console.log("  Enqueued: A, B, C");

  console.log("  dequeue():", q.dequeue()); // "A"
  console.log("  dequeue():", q.dequeue()); // "B"

  q.enqueue("D");
  console.log("  Enqueued: D");

  console.log("  dequeue():", q.dequeue()); // "C"
  console.log("  dequeue():", q.dequeue()); // "D"
  console.log("  isEmpty():", q.isEmpty()); // true
  console.log();
}

// ============================================================
// 4. FIRST UNIQUE CHARACTER (LeetCode 387)
// ============================================================
//
// Đề: Tìm index của ký tự đầu tiên không lặp lại trong string.
//
// Tại sao Queue?
// - Queue giữ thứ tự xuất hiện.
// - Loại ký tự lặp ở đầu queue.
// - Phần tử đầu = ký tự unique đầu tiên.

function firstUniqChar(s) {
  const freq = {};
  const queue = [];

  // Bước 1: Đếm tần suất + giữ thứ tự
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    freq[ch] = (freq[ch] || 0) + 1;
    queue.push({ char: ch, index: i });
  }

  // Bước 2: Loại ký tự lặp ở đầu
  while (queue.length > 0 && freq[queue[0].char] > 1) {
    queue.shift();
  }

  // Bước 3: Phần tử đầu = answer
  return queue.length > 0 ? queue[0].index : -1;
}

function runFirstUniqueDemo() {
  console.log("=== 4. First Unique Character (LC 387) ===\n");

  const tests = [
    { input: "leetcode", expected: 0 },
    { input: "loveleetcode", expected: 2 },
    { input: "aabb", expected: -1 },
  ];

  for (const { input, expected } of tests) {
    const result = firstUniqChar(input);
    const status = result === expected ? "PASS" : "FAIL";
    const char = result >= 0 ? `'${input[result]}'` : "none";
    console.log(`  "${input}" → index ${result} (${char}) [${status}]`);
  }
  console.log();
}

// ============================================================
// BONUS: HÀNG ĐỢI IN ẤN — Print Queue
// ============================================================

function runPrintQueueDemo() {
  console.log("=== Bonus: Print Queue ===\n");

  const printQueue = [];

  // Gửi file in
  printQueue.push({ name: "report.pdf", pages: 10 });
  printQueue.push({ name: "photo.jpg", pages: 1 });
  printQueue.push({ name: "resume.docx", pages: 2 });

  console.log("  Hàng chờ in:", printQueue.map((f) => f.name).join(", "));

  // Máy in xử lý
  while (printQueue.length > 0) {
    const file = printQueue.shift();
    console.log(`  Đang in: ${file.name} (${file.pages} trang)`);
  }

  console.log("  Hoàn tất!\n");
}

// ============================================================
// MAIN — Chạy tất cả ví dụ
// ============================================================

function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║   Session 9 — Queue (FIFO) Examples  ║");
  console.log("╚══════════════════════════════════════╝\n");

  runBasicQueueDemo();
  runRecentCallsDemo();
  runQueueFromStacksDemo();
  runFirstUniqueDemo();
  runPrintQueueDemo();

  console.log("══════════════════════════════════════");
  console.log("Queue = FIFO: First In, First Out");
  console.log("Ai xếp hàng trước → được phục vụ trước.");
  console.log("══════════════════════════════════════");
}

main();
