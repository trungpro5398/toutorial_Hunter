/**
 * Session 3 - TypeScript Examples
 *
 * This file contains complete examples for:
 * - type aliases
 * - interfaces
 * - union types
 * - optional fields
 * - basic generics
 * - async typing with Promise<T>
 *
 * No `any` is used in this file.
 */

type UserId = number;
type Role = "student" | "mentor";
type LoadStatus = "idle" | "loading" | "success" | "error";
type InputValue = string | number;

interface User {
  id: UserId;
  name: string;
  role: Role;
  email?: string;
}

interface ApiSuccess<T> {
  ok: true;
  data: T;
}

interface ApiFailure {
  ok: false;
  error: string;
}

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

function normalizeId(value: InputValue): number {
  if (typeof value === "number") {
    return value;
  }

  return Number(value);
}

function formatUser(user: User): string {
  const emailText = user.email ? ` | Email: ${user.email}` : " | Email: not provided";
  return `#${user.id} ${user.name} (${user.role})${emailText}`;
}

function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

function wrapValue<T>(value: T): T[] {
  return [value];
}

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function loadUser(id: number): Promise<ApiResult<User>> {
  await wait(10);

  if (id <= 0) {
    return {
      ok: false,
      error: "Invalid user id",
    };
  }

  return {
    ok: true,
    data: {
      id,
      name: "Hunter",
      role: "student",
      email: "hunter@example.com",
    },
  };
}

async function demoAsyncContract(id: number): Promise<string> {
  const result = await loadUser(id);

  if (!result.ok) {
    return `Load failed: ${result.error}`;
  }

  return `Loaded user: ${formatUser(result.data)}`;
}

async function main(): Promise<void> {
  const status: LoadStatus = "loading";
  console.log("Status:", status);

  const normalizedFromString = normalizeId("42");
  const normalizedFromNumber = normalizeId(42);

  console.log("normalizeId(\"42\"):", normalizedFromString);
  console.log("normalizeId(42):", normalizedFromNumber);

  const user: User = {
    id: 1,
    name: "Hunter",
    role: "student",
  };

  console.log("formatUser(user):", formatUser(user));

  const firstName = firstItem(["Alice", "Bob", "Cindy"]);
  const firstScore = firstItem([10, 20, 30]);

  console.log("firstItem<string>:", firstName);
  console.log("firstItem<number>:", firstScore);

  console.log("wrapValue<boolean>(true):", wrapValue(true));
  console.log("wrapValue<User>(user):", wrapValue(user));

  console.log(await demoAsyncContract(1));
  console.log(await demoAsyncContract(-1));
}

void main();
