import {
  addFinishedTaskIds,
  FINISHED_TASK_IDS_KEY,
  getFinishedTaskIds,
} from "./mutatedTaskFilter";

/*
 source: https://stackoverflow.com/questions/51566816/what-is-the-best-way-to-mock-window-sessionstorage-in-jest
 */
const sessionStorageMock = (() => {
  let store: any = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

describe("finishedTaskFilter", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });

  describe("addFinishedTaskIds", () => {
    it("should add id correctly", () => {
      sessionStorageMock.setItem(FINISHED_TASK_IDS_KEY, '["a","b"]');
      addFinishedTaskIds("c");
      expect(sessionStorageMock.getItem(FINISHED_TASK_IDS_KEY)).toBe(
        '["a","b","c"]'
      );
    });
  });

  describe("getFinishedTaskIds", () => {
    it("should return parsed array from sessionStorage", () => {
      sessionStorageMock.setItem(FINISHED_TASK_IDS_KEY, '["a","b"]');
      expect(getFinishedTaskIds()).toEqual(["a", "b"]);
    });
    it("should return empty array if no value exists in sessionStorage", () => {
      expect(getFinishedTaskIds()).toEqual([]);
    });
    it("should return empty array if json is not parsable", () => {
      sessionStorageMock.setItem(FINISHED_TASK_IDS_KEY, "no-json");
      expect(getFinishedTaskIds()).toEqual([]);
    });
  });
});
