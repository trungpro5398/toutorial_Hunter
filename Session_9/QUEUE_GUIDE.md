# Queue (Hàng đợi) — FIFO: First In, First Out

## Tại sao học Queue?

> Sau Stack (LIFO), Queue (FIFO) là cấu trúc dữ liệu cơ bản thứ hai mà mọi lập trình viên phải biết.
> Stack = chồng đĩa (lấy đĩa trên cùng).
> Queue = xếp hàng mua trà sữa (ai đến trước phục vụ trước).

---

## 1. Mental Model: Hàng chờ mua trà sữa

```
QUẦY ← [Khách 1] [Khách 2] [Khách 3] [Khách 4] ← CỬA VÀO

   dequeue()                              enqueue()
   (phục vụ)                              (xếp hàng)
```

**Quy tắc:**
- Khách mới → xếp vào CUỐI hàng (`enqueue`).
- Quầy phục vụ → lấy người ở ĐẦU hàng (`dequeue`).
- Không ai được chen hàng.

---

## 2. Hai thao tác cốt lõi

| Thao tác | Ý nghĩa | Array method | Độ phức tạp |
|----------|---------|-------------|------------|
| `enqueue(item)` | Thêm vào cuối | `push()` | O(1) |
| `dequeue()` | Lấy từ đầu | `shift()` | O(n)* |

> *`shift()` là O(n) vì phải dời tất cả phần tử. Trong bài tập LeetCode cơ bản, điều này chấp nhận được. Khi cần tối ưu, dùng linked list hoặc circular buffer.

---

## 3. Ví dụ đời thực của Queue

### 3.1 — Hàng đợi in ấn (Print Queue)

Bạn gửi 3 file in. Máy in xử lý theo thứ tự gửi:

```javascript
"use strict";

function printQueueDemo() {
  const printQueue = [];

  // Gửi 3 file in
  printQueue.push("report.pdf");
  printQueue.push("photo.jpg");
  printQueue.push("resume.docx");
  console.log("Hàng chờ in:", printQueue);
  // → ["report.pdf", "photo.jpg", "resume.docx"]

  // Máy in xử lý từng file
  while (printQueue.length > 0) {
    const file = printQueue.shift();
    console.log("Đang in:", file);
  }
  // Đang in: report.pdf
  // Đang in: photo.jpg
  // Đang in: resume.docx

  console.log("Hoàn tất, hàng chờ:", printQueue);
  // → []
}
```

### 3.2 — Tin nhắn chat

Tin nhắn gửi trước hiện trước trên màn hình:

```javascript
function chatDemo() {
  const messageQueue = [];

  // Tin nhắn đến theo thứ tự
  messageQueue.push({ from: "An", text: "Hello!" });
  messageQueue.push({ from: "Bình", text: "Hi there!" });
  messageQueue.push({ from: "An", text: "Bạn khỏe không?" });

  // Hiển thị theo thứ tự nhận
  while (messageQueue.length > 0) {
    const msg = messageQueue.shift();
    console.log(`${msg.from}: ${msg.text}`);
  }
  // An: Hello!
  // Bình: Hi there!
  // An: Bạn khỏe không?
}
```

### 3.3 — BFS: Duyệt theo tầng

Queue là nền tảng của BFS (Breadth-First Search) — duyệt đồ thị/cây theo tầng.

**Ví dụ:** Tìm bạn bè cách bạn 2 bước trên mạng xã hội.

```
Bạn → [Bạn bè tầng 1] → [Bạn bè tầng 2]

      Bạn
     / | \
    A   B   C        ← tầng 1
   / \   \
  D   E    F         ← tầng 2
```

Queue giúp duyệt đúng thứ tự: Bạn → A → B → C → D → E → F.

---

## 4. Bài toán mẫu

### Bài 1: Number of Recent Calls (LeetCode 933)

**Đề:** Viết class đếm số lượng request trong khoảng 3000ms gần nhất.

**Phân tích:**
- Mỗi lần `ping(t)`, thêm timestamp `t` vào queue.
- Loại bỏ tất cả timestamp < `t - 3000` (quá cũ).
- Trả về số phần tử còn trong queue.

```javascript
function recentCounter() {
  const queue = [];

  return function ping(t) {
    queue.push(t);

    // Loại request quá cũ ở đầu queue
    while (queue[0] < t - 3000) {
      queue.shift();
    }

    return queue.length;
  };
}

// Test
function testRecentCalls() {
  const counter = recentCounter();

  console.log("=== Recent Calls ===");
  console.log("ping(1)   →", counter(1));    // 1
  console.log("ping(100) →", counter(100));  // 2
  console.log("ping(3001)→", counter(3001)); // 3
  console.log("ping(3002)→", counter(3002)); // 3 (t=1 bị loại)
}
```

**Trace thủ công:**
```
ping(1):    queue = [1]             → length = 1
ping(100):  queue = [1, 100]        → length = 2
ping(3001): queue = [1, 100, 3001]  → length = 3  (1 >= 3001-3000=1, giữ lại)
ping(3002): queue = [100, 3001, 3002] → length = 3  (1 < 3002-3000=2, loại!)
```

### Bài 2: Implement Queue using Stacks (LeetCode 232)

**Đề:** Dùng 2 Stack để tạo Queue.

**Ý tưởng:** Đổ stack này sang stack kia để đảo ngược thứ tự.

```
Stack 1 (inbox):  push vào đây
Stack 2 (outbox): pop từ đây

Khi outbox rỗng → đổ hết inbox sang outbox (đảo ngược thứ tự)
```

```javascript
function createQueueFromStacks() {
  const inbox = [];   // stack 1: nhận phần tử mới
  const outbox = [];  // stack 2: phục vụ phần tử cũ

  function enqueue(item) {
    inbox.push(item);
  }

  function dequeue() {
    if (outbox.length === 0) {
      // Đổ hết inbox sang outbox
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

// Test
function testQueueFromStacks() {
  const q = createQueueFromStacks();

  q.enqueue("A");
  q.enqueue("B");
  q.enqueue("C");

  console.log("=== Queue from 2 Stacks ===");
  console.log("dequeue:", q.dequeue()); // "A" (first in)
  console.log("dequeue:", q.dequeue()); // "B"

  q.enqueue("D");

  console.log("dequeue:", q.dequeue()); // "C"
  console.log("dequeue:", q.dequeue()); // "D"
  console.log("empty?", q.isEmpty());   // true
}
```

**Trace:**
```
enqueue("A"): inbox = [A],  outbox = []
enqueue("B"): inbox = [A,B], outbox = []
enqueue("C"): inbox = [A,B,C], outbox = []

dequeue():
  outbox rỗng → đổ inbox sang outbox
  inbox = [], outbox = [C, B, A]    ← đảo ngược!
  pop outbox → "A" ✓ (FIFO)

dequeue():
  outbox = [C, B]
  pop outbox → "B" ✓

enqueue("D"): inbox = [D], outbox = [C]

dequeue():
  outbox không rỗng → pop outbox → "C" ✓

dequeue():
  outbox rỗng → đổ inbox sang outbox
  inbox = [], outbox = [D]
  pop outbox → "D" ✓
```

### Bài 3: First Unique Character in a String (LeetCode 387)

**Đề:** Tìm index của ký tự đầu tiên không lặp lại.

**Ý tưởng:** Queue giữ thứ tự xuất hiện, kết hợp đếm tần suất.

```javascript
function firstUniqChar(s) {
  const freq = {};       // đếm tần suất
  const queue = [];      // giữ thứ tự xuất hiện

  // Bước 1: Đếm tần suất mỗi ký tự
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    freq[ch] = (freq[ch] || 0) + 1;
    queue.push({ char: ch, index: i });
  }

  // Bước 2: Loại ký tự lặp ở đầu queue
  while (queue.length > 0 && freq[queue[0].char] > 1) {
    queue.shift();
  }

  // Bước 3: Phần tử đầu queue = ký tự unique đầu tiên
  return queue.length > 0 ? queue[0].index : -1;
}

function testFirstUnique() {
  console.log("=== First Unique Character ===");
  console.log("leetcode →", firstUniqChar("leetcode"));   // 0 ('l')
  console.log("loveleetcode →", firstUniqChar("loveleetcode")); // 2 ('v')
  console.log("aabb →", firstUniqChar("aabb"));           // -1
}
```

---

## 5. So sánh Stack vs Queue

| | Stack (LIFO) | Queue (FIFO) |
|---|-------------|-------------|
| Thêm | push (đỉnh) | enqueue/push (cuối) |
| Lấy | pop (đỉnh) | dequeue/shift (đầu) |
| Xem | peek (đỉnh) | peek (đầu) |
| Ví dụ | Undo, parentheses, DFS | Hàng đợi, BFS, scheduler |
| Khi nào | "Quay lại thứ gần nhất" | "Xử lý theo thứ tự đến" |

---

## 6. Khi nào nhận ra cần Queue?

**Dấu hiệu:**
1. Xử lý theo thứ tự **ai đến trước** → Queue.
2. Duyệt theo **tầng/level** (BFS) → Queue.
3. **Cửa sổ thời gian** — loại phần tử quá cũ → Queue.
4. **Buffer/đệm** — nhận dữ liệu rồi xử lý sau → Queue.

**Công thức nhận dạng:**
```
Nếu bài yêu cầu:
  "thứ tự đến"     → Queue
  "gần nhất"       → Stack
  "theo tầng"      → Queue (BFS)
  "chưa đóng"      → Stack (matching)
```

---

## 7. Bài tập tự luyện

| Mức độ | Bài | LeetCode # |
|--------|-----|-----------|
| Easy | Number of Recent Calls | 933 |
| Easy | Implement Queue using Stacks | 232 |
| Easy | First Unique Character | 387 |
| Medium | Number of Islands (BFS) | 200 |
| Medium | Rotting Oranges | 994 |
