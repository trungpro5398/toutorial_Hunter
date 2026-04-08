# Session 9 — React Native Setup + Primitives (View / Text / Pressable / TextInput)

## Mục tiêu buổi học (60-75 phút)

| # | Nội dung | Thời gian |
|---|---------|-----------|
| 1 | Mindset: Mobile khác Web ở đâu? | 10 phút |
| 2 | Setup Expo + TypeScript | 10 phút |
| 3 | Primitive components: View, Text, Pressable, TextInput | 25 phút |
| 4 | StyleSheet & Flexbox trên mobile | 15 phút |
| 5 | Algorithm: Queue (FIFO) | 15 phút |

---

## Phần 0 — Ba điều cần nhớ sau buổi này

> 1. **Mobile không có `<div>` hay `<span>`** — mọi thứ là `View` (hộp) và `Text` (chữ).
> 2. **Flexbox mặc định `column`** — mobile đọc từ trên xuống, không phải từ trái qua phải.
> 3. **Queue = FIFO** — ai xếp hàng trước được phục vụ trước, ngược lại với Stack.

---

## Phần 1 — Mindset: Mobile khác Web ở đâu? (10 phút)

### Ví dụ đời thực

Hãy tưởng tượng bạn đang thiết kế **bảng thông báo**:

- **Web** = bảng thông báo treo tường → người xem đứng cách xa, nhìn toàn bộ cùng lúc, dùng chuột trỏ vào từng mục.
- **Mobile** = bảng thông báo cầm tay → người xem cầm sát mặt, chỉ thấy một phần, dùng ngón tay chạm và vuốt.

### Bảng so sánh Web vs Mobile

| Khía cạnh | Web (React) | Mobile (React Native) |
|-----------|------------|----------------------|
| Khối chứa | `<div>` | `<View>` |
| Hiển thị chữ | `<span>`, `<p>`, `<h1>` | `<Text>` (bắt buộc, không viết chữ ngoài Text) |
| Nút bấm | `<button>` | `<Pressable>` |
| Ô nhập | `<input>` | `<TextInput>` |
| Layout mặc định | `display: block` (trên → dưới) | `flexDirection: 'column'` (trên → dưới) |
| Đơn vị | `px`, `rem`, `%` | Không đơn vị (density-independent pixels) |
| Style | CSS file / className | `StyleSheet.create({})` — JS object |
| Scroll | Tự scroll nếu nội dung tràn | Phải dùng `ScrollView` hoặc `FlatList` |

### Lỗi phổ biến nhất khi chuyển từ Web sang Mobile

```
❌ Lỗi: "Text strings must be rendered within a <Text> component"
```

**Nguyên nhân:** Viết chữ trực tiếp trong `<View>` mà không bọc `<Text>`.

```tsx
// ❌ Sai — Mobile không cho phép
<View>
  Hello World
</View>

// ✅ Đúng — Phải bọc trong Text
<View>
  <Text>Hello World</Text>
</View>
```

> **Quy tắc vàng:** Trên mobile, mọi chữ phải nằm trong `<Text>`. Không ngoại lệ.

---

## Phần 2 — Setup Expo + TypeScript (10 phút)

### Tại sao dùng Expo?

- **Expo** = bộ công cụ giúp tạo app React Native mà không cần cài Android Studio hay Xcode.
- Giống như `create-react-app` cho mobile.
- Chạy thử trên điện thoại thật bằng app **Expo Go**.

### Các bước setup

```bash
# Bước 1: Tạo project mới với TypeScript template
npx create-expo-app@latest GreetingApp --template blank-typescript

# Bước 2: Di chuyển vào project
cd GreetingApp

# Bước 3: Chạy app
npx expo start
```

### Cách xem app trên điện thoại

1. Cài app **Expo Go** trên điện thoại (App Store / Google Play).
2. Quét mã QR hiện trên terminal.
3. App sẽ load trên điện thoại.

### Cách xem app trên máy tính (không cần điện thoại)

```bash
# Nhấn 'w' trong terminal để mở trên web browser
# Hoặc nhấn 'a' cho Android emulator / 'i' cho iOS simulator
```

### Cấu trúc project

```
GreetingApp/
├── App.tsx          ← File chính, giống index.html + App.js
├── app.json         ← Cấu hình app (tên, icon, splash screen)
├── tsconfig.json    ← TypeScript config
├── package.json     ← Dependencies
└── node_modules/    ← Thư viện
```

### Checkpoint 1: Chạy được app, thấy màn hình mặc định

---

## Phần 3 — Primitive Components (25 phút)

### Mental Model: 4 viên gạch xây mọi UI

Hãy tưởng tượng bạn đang xây nhà:

| Component | Giống như... | Vai trò |
|-----------|-------------|---------|
| `View` | Phòng trong nhà | Chứa mọi thứ, tạo bố cục |
| `Text` | Bảng hiệu, nhãn dán | Hiển thị chữ |
| `TextInput` | Hộp thư / ô ghi chú | Nhận input từ người dùng |
| `Pressable` | Công tắc đèn, nút chuông | Phản hồi khi người dùng chạm |

> Mọi UI trên mobile đều được xây từ 4 viên gạch này. Instagram, Grab, Shopee — tất cả đều dùng View, Text, TextInput, Pressable.

### 3.1 — View (Phòng trong nhà)

```tsx
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // chiếm toàn bộ màn hình
    justifyContent: "center",   // căn giữa theo trục dọc
    alignItems: "center",       // căn giữa theo trục ngang
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#3498db",
    marginBottom: 10,
  },
});
```

**Giải thích:**

- `View` = phòng trống, không hiển thị gì nếu không có style.
- `flex: 1` = "chiếm hết không gian còn lại" (giống nói "phòng này rộng bằng cả tầng").
- Mặc định `flexDirection: 'column'` → các phần tử con xếp **từ trên xuống**.

### 3.2 — Text (Bảng hiệu)

```tsx
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào!</Text>
      <Text style={styles.subtitle}>Đây là app đầu tiên của tôi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 8,
  },
});
```

**Khác biệt quan trọng với Web:**

```tsx
// ❌ Sai — Không có <h1>, <p>, <span> trên mobile
<h1>Tiêu đề</h1>
<p>Đoạn văn</p>

// ✅ Đúng — Dùng Text với style khác nhau
<Text style={styles.title}>Tiêu đề</Text>
<Text style={styles.subtitle}>Đoạn văn</Text>
```

> Trên web, HTML tag quyết định kiểu chữ (`<h1>` to, `<p>` nhỏ).
> Trên mobile, **style quyết định tất cả** — `Text` chỉ là container cho chữ.

### 3.3 — TextInput (Hộp thư)

```tsx
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function App() {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên của bạn:</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên..."
        placeholderTextColor="#999"
      />

      <Text style={styles.preview}>
        Bạn đã nhập: {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  preview: {
    marginTop: 16,
    fontSize: 16,
    color: "#27ae60",
  },
});
```

**So sánh Web vs Mobile:**

```tsx
// Web React
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}  // phải lấy e.target.value
/>

// React Native
<TextInput
  value={name}
  onChangeText={setName}                     // nhận string trực tiếp!
/>
```

> **Khác biệt lớn:** Web dùng `onChange` + `e.target.value`. Mobile dùng `onChangeText` — nhận thẳng string, không cần event object.

### 3.4 — Pressable (Công tắc đèn)

```tsx
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Tăng +1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: "#2980b9",
    opacity: 0.8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
```

**Tại sao Pressable chứ không phải Button?**

| Component | Ưu điểm | Nhược điểm |
|-----------|---------|------------|
| `Button` | Đơn giản, 1 dòng code | Không style được, xấu, khác nhau trên iOS/Android |
| `TouchableOpacity` | Quen thuộc, dễ dùng | Đã lỗi thời (legacy) |
| `Pressable` ✅ | Style tùy ý, có `pressed` state, được khuyến nghị | Cần viết nhiều hơn một chút |

> **Quy tắc:** Luôn dùng `Pressable`. Nó là cách chính thức và linh hoạt nhất.

### Checkpoint 2: Có đủ 4 primitives trên màn hình

---

## Phần 4 — StyleSheet & Flexbox trên Mobile (15 phút)

### Tại sao dùng StyleSheet.create()?

```tsx
// ❌ Inline style — tạo object mới mỗi lần render
<View style={{ flex: 1, backgroundColor: "red" }} />

// ✅ StyleSheet — tạo 1 lần, dùng lại nhiều lần
<View style={styles.container} />

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "red" },
});
```

**Lý do:**
1. **Performance** — StyleSheet.create() tối ưu hóa style, không tạo object mới mỗi render.
2. **Validation** — Báo lỗi nếu viết sai tên property (ví dụ `backgroud-color` thay vì `backgroundColor`).
3. **Tổ chức** — Style tách riêng, code sạch hơn.

### Flexbox trên Mobile: Mặc định khác Web!

```
Web mặc định:     flexDirection: 'row'    → trái qua phải →→→
Mobile mặc định:  flexDirection: 'column' → trên xuống dưới ↓↓↓
```

**Ví dụ minh họa:**

```tsx
// 3 ô xếp DỌC (mặc định mobile)
<View style={{ flex: 1 }}>
  <View style={{ height: 50, backgroundColor: "red" }} />
  <View style={{ height: 50, backgroundColor: "green" }} />
  <View style={{ height: 50, backgroundColor: "blue" }} />
</View>

// 3 ô xếp NGANG (phải set flexDirection)
<View style={{ flex: 1, flexDirection: "row" }}>
  <View style={{ flex: 1, backgroundColor: "red" }} />
  <View style={{ flex: 1, backgroundColor: "green" }} />
  <View style={{ flex: 1, backgroundColor: "blue" }} />
</View>
```

### Cheat Sheet: Flexbox Mobile

```
justifyContent → căn theo TRỤC CHÍNH (mặc định: dọc)
  'flex-start'   : dồn lên trên
  'center'       : căn giữa
  'flex-end'     : dồn xuống dưới
  'space-between': cách đều, sát 2 đầu
  'space-around' : cách đều, có khoảng 2 đầu

alignItems → căn theo TRỤC PHỤ (mặc định: ngang)
  'flex-start'   : dồn sang trái
  'center'       : căn giữa
  'flex-end'     : dồn sang phải
  'stretch'      : kéo dài hết chiều ngang (mặc định)
```

### Khác biệt Style: Web CSS vs React Native

```tsx
// Web CSS
.container {
  background-color: red;     /* kebab-case */
  font-size: 16px;           /* đơn vị px */
  margin-top: 10px;
  border-radius: 8px;
}

// React Native StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",   // camelCase
    fontSize: 16,              // không đơn vị
    marginTop: 10,
    borderRadius: 8,
  },
});
```

**3 khác biệt chính:**
1. **camelCase** thay vì kebab-case
2. **Không đơn vị** — số = density-independent pixels (tự co giãn theo màn hình)
3. **Không cascading** — style không kế thừa từ parent (trừ Text lồng Text)

### Checkpoint 3: Layout 2 hàng ngang, mỗi hàng 2 ô màu

---

## Phần 5 — Algorithm: Queue / FIFO (15 phút)

### Kết nối với Session 8

> Session 8: **Stack = LIFO** — Last In, First Out (chồng đĩa).
> Session 9: **Queue = FIFO** — First In, First Out (xếp hàng).

Stack và Queue là **cặp đôi**: cùng là danh sách, nhưng quy tắc lấy ra ngược nhau.

### Ví dụ đời thực: Hàng chờ mua trà sữa

Bạn đến quán trà sữa:

```
Quầy ← [Người 1] [Người 2] [Người 3] [BẠN] ← vào cuối hàng

Người 1 được phục vụ trước (First In, First Out).
Bạn vào sau cùng, được phục vụ cuối cùng.
```

**Thêm ví dụ:**
- **Hàng đợi in ấn:** Tài liệu gửi trước → in trước.
- **Tin nhắn chat:** Tin gửi trước → hiện trước.
- **Đặt hàng online:** Đơn đặt trước → xử lý trước.
- **BFS (Breadth-First Search):** Duyệt các node theo thứ tự "gần trước, xa sau".

### Hai thao tác cơ bản

```
enqueue(item) → thêm vào CUỐI hàng
dequeue()     → lấy ra từ ĐẦU hàng

           FRONT                    BACK
dequeue ← [A] [B] [C] [D] ← enqueue
```

### Implement Queue bằng Array

```javascript
"use strict";

// === CÁCH 1: Queue đơn giản bằng Array ===
// Dùng shift() để dequeue — dễ hiểu nhưng O(n)

function demoSimpleQueue() {
  const queue = [];

  // enqueue: thêm vào cuối — O(1)
  queue.push("Khách A");
  queue.push("Khách B");
  queue.push("Khách C");
  console.log("Hàng đợi:", queue);
  // → ["Khách A", "Khách B", "Khách C"]

  // dequeue: lấy từ đầu — O(n) vì shift() phải dời tất cả phần tử
  const served = queue.shift();
  console.log("Phục vụ:", served);
  // → "Khách A"
  console.log("Còn lại:", queue);
  // → ["Khách B", "Khách C"]
}
```

### Bài toán kinh điển: Number of Recent Calls (LeetCode 933)

**Đề bài:** Đếm số request trong 3000ms gần nhất.

**Ví dụ:**
```
ping(1)    → 1 request  (trong khoảng [-2999, 1])
ping(100)  → 2 requests (trong khoảng [-2900, 100])
ping(3001) → 3 requests (trong khoảng [1, 3001])
ping(3002) → 3 requests (trong khoảng [2, 3002]) → request t=1 bị loại!
```

**Tại sao dùng Queue?**
- Request cũ nhất nằm ở đầu hàng.
- Khi request quá cũ (hơn 3000ms) → loại ra khỏi đầu hàng.
- Queue giữ đúng thứ tự thời gian.

```javascript
function recentCounter() {
  const queue = [];

  return function ping(t) {
    // 1. Thêm request mới vào cuối
    queue.push(t);

    // 2. Loại bỏ request quá cũ ở đầu
    while (queue[0] < t - 3000) {
      queue.shift();
    }

    // 3. Số request còn lại = số request trong 3000ms
    return queue.length;
  };
}

// Demo
const counter = recentCounter();
console.log(counter(1));    // 1
console.log(counter(100));  // 2
console.log(counter(3001)); // 3
console.log(counter(3002)); // 3 (request t=1 bị loại)
```

### Khi nào dùng Queue?

| Dấu hiệu | Ví dụ |
|-----------|-------|
| Xử lý theo thứ tự đến | Hàng chờ, task scheduler |
| Duyệt theo tầng (BFS) | Tìm đường ngắn nhất, level-order tree |
| Cửa sổ thời gian | Đếm request gần đây, rate limiter |
| Buffer dữ liệu | Stream processing, message queue |

### So sánh Stack vs Queue

| | Stack (LIFO) | Queue (FIFO) |
|---|-------------|-------------|
| Thêm | push (đỉnh) | enqueue (cuối) |
| Lấy | pop (đỉnh) | dequeue (đầu) |
| Ví dụ | Ctrl+Z, parentheses | Hàng đợi, BFS |
| JS Array | push/pop | push/shift |

---

## Phần 6 — Live Code: Greeting App (còn lại)

### Bước 1: Khung cơ bản

```tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Greeting App</Text>
      {/* Thêm các phần tiếp theo ở đây */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#2c3e50",
  },
});
```

### Bước 2: Thêm TextInput + validation

```tsx
function handleGreet() {
  // Validation: tên không được rỗng
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    setError("Vui lòng nhập tên!");
    setGreeting("");
    return;
  }

  // Validation: tên không quá ngắn
  if (trimmed.length < 2) {
    setError("Tên phải có ít nhất 2 ký tự!");
    setGreeting("");
    return;
  }

  // Thành công
  setError("");
  setGreeting(`Xin chào, ${trimmed}! 👋`);
}
```

### Bước 3: Thêm nút Clear

```tsx
function handleClear() {
  setName("");
  setGreeting("");
  setError("");
}
```

### Bước 4: Ghép lại thành app hoàn chỉnh

(Xem file `greeting_demo/App.tsx`)

### Checkpoint 4: App chạy, nhập tên → hiện greeting, Clear hoạt động

---

## Lỗi thường gặp khi học React Native

### Lỗi 1: Chữ ngoài Text
```tsx
// ❌
<View>Hello</View>
// ✅
<View><Text>Hello</Text></View>
```

### Lỗi 2: Quên flex: 1 cho container
```tsx
// ❌ Không thấy gì trên màn hình
<View style={{ justifyContent: "center" }}>

// ✅ Container phải chiếm không gian
<View style={{ flex: 1, justifyContent: "center" }}>
```

### Lỗi 3: Dùng CSS class thay vì StyleSheet
```tsx
// ❌ Không có className trên React Native
<View className="container">

// ✅ Dùng style prop
<View style={styles.container}>
```

### Lỗi 4: Nhầm onChange với onChangeText
```tsx
// ❌ Web habit — không hoạt động đúng
<TextInput onChange={(e) => setName(e.target.value)} />

// ✅ React Native — nhận string trực tiếp
<TextInput onChangeText={setName} />
```

### Lỗi 5: Style dùng kebab-case
```tsx
// ❌
{ "background-color": "red", "font-size": 16 }

// ✅
{ backgroundColor: "red", fontSize: 16 }
```

---

## Tổng kết

### Bảng tra nhanh

| Web | React Native | Ghi chú |
|-----|-------------|---------|
| `<div>` | `<View>` | Container |
| `<span>`, `<p>` | `<Text>` | Bắt buộc cho mọi chữ |
| `<button>` | `<Pressable>` | Có pressed state |
| `<input>` | `<TextInput>` | onChangeText thay onChange |
| CSS file | StyleSheet.create | camelCase, không đơn vị |
| flex-direction: row | flexDirection: 'column' | Mặc định KHÁC nhau |
| className | style={} | Không có class trên mobile |

### Ba điều nhớ sau buổi này (nhắc lại)

1. **Mobile không có div/span** — dùng View và Text.
2. **Flexbox mặc định column** — suy nghĩ từ trên xuống.
3. **Queue = FIFO** — ai vào trước ra trước, đối lập Stack.
