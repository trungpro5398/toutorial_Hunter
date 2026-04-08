# Session 9 — Homework: Greeting App + Queue

## Thời gian ước tính: 10 giờ

---

## Phần 1: React Native — Greeting App (7 giờ)

### Yêu cầu

Xây dựng app React Native (Expo + TypeScript) với các chức năng:

1. **TextInput** để nhập tên.
2. **Nút "Chào"** — nhấn → hiển thị lời chào (ví dụ: "Xin chào, An!").
3. **Nút "Xóa"** — nhấn → reset tên, lời chào, lỗi về trạng thái ban đầu.
4. **Validation đơn giản:**
   - Tên không được rỗng → hiện lỗi "Vui lòng nhập tên!"
   - Tên ít nhất 2 ký tự → hiện lỗi "Tên phải có ít nhất 2 ký tự!"
5. **Lỗi tự xóa** khi user bắt đầu gõ lại.

### Pass Criteria (Phải đạt)

| # | Tiêu chí | Chi tiết |
|---|---------|---------|
| 1 | App chạy được | `npx expo start` không lỗi, hiển thị trên Expo Go hoặc web |
| 2 | TextInput hoạt động | Controlled input: `value` + `onChangeText` |
| 3 | Nút Chào hoạt động | Nhấn → hiện lời chào khi tên hợp lệ |
| 4 | Nút Xóa hoạt động | Reset tất cả state về ban đầu |
| 5 | Validation hoạt động | Hiện lỗi khi tên rỗng hoặc quá ngắn |
| 6 | Dùng StyleSheet | Không dùng inline style cho mọi element |
| 7 | Dùng Pressable | Không dùng Button hay TouchableOpacity |
| 8 | TypeScript | File `.tsx`, không có lỗi TypeScript |

### Cấu trúc project

```
Session_9_Homework/
├── App.tsx          ← Code chính
├── app.json
├── tsconfig.json
├── package.json
└── README.md        ← Dùng template bên dưới
```

### Gợi ý từng bước

1. **Setup:** `npx create-expo-app@latest Session_9_Homework --template blank-typescript`
2. **Bước 1:** Tạo layout cơ bản — View container + Text tiêu đề
3. **Bước 2:** Thêm TextInput với `useState` (controlled input)
4. **Bước 3:** Thêm nút "Chào" với Pressable + hàm handleGreet
5. **Bước 4:** Thêm validation trong handleGreet
6. **Bước 5:** Thêm nút "Xóa" với hàm handleClear
7. **Bước 6:** Style cho đẹp với StyleSheet.create

---

## Phần 2: Algorithm — Queue (3 giờ)

### Chọn 1 trong 3 mức độ

#### Mức Easy: Number of Recent Calls (LeetCode 933)
- Implement hàm `ping(t)` đếm request trong 3000ms.
- Dùng queue (array + push/shift).

#### Mức Easy-Medium: Implement Queue using Stacks (LeetCode 232)
- Dùng 2 stack (array + push/pop) để tạo queue.
- Implement: `enqueue`, `dequeue`, `peek`, `isEmpty`.

#### Mức Medium: First Unique Character in a String (LeetCode 387)
- Tìm index ký tự đầu tiên không lặp lại.
- Kết hợp queue + frequency map.

### Pass Criteria (Algorithm)

| # | Tiêu chí |
|---|---------|
| 1 | Code chạy đúng với test cases đề bài |
| 2 | Giải thích được tại sao dùng Queue |
| 3 | Trace được ít nhất 1 test case bằng tay |

---

## Stretch Goals (Không bắt buộc)

- [ ] Thêm keyboard dismiss khi chạm ngoài input
- [ ] Thêm animation khi hiện lời chào
- [ ] Thêm danh sách lịch sử các tên đã chào (dùng array state)
- [ ] Solve thêm bài Queue khác: Rotting Oranges (LC 994)

---

## Nộp bài

1. Push code lên GitHub.
2. Điền README theo template.
3. Chụp screenshot app chạy trên Expo Go hoặc web (đính kèm trong README).

---

## Tác dụng homework

| Phần | Bạn sẽ luyện được |
|------|--------------------|
| React Native setup | Quen môi trường Expo, cách chạy và xem lỗi trên thiết bị |
| Primitives | Dùng thành thạo View, Text, TextInput, Pressable |
| StyleSheet | Tạo layout với Flexbox trên mobile |
| Validation | Xử lý input người dùng (kỹ năng dùng mãi) |
| Queue | Hiểu FIFO, biết khi nào dùng Queue vs Stack |
