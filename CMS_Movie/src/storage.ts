class FallbackStorage implements Storage {
    private data: Record<string, string> = {};
  
    get length(): number {
      return Object.keys(this.data).length;
    }
  
    clear(): void {
      this.data = {};
    }
  
    getItem(key: string): string | null {
      return this.data[key] || null;
    }
  
    key(index: number): string | null {
      return Object.keys(this.data)[index] || null;
    }
  
    removeItem(key: string): void {
      if (key in this.data) {
        delete this.data[key];
      }
    }
  
    setItem(key: string, value: string): void {
      this.data[key] = value;
    }
  }
  
  function getStorage(name: 'localStorage' | 'sessionStorage', fallback: Storage): Storage {
    try {
      return window[name];
    } catch {
      /**
       * return fallback storage when browser throw a SecurityError
       * references:
       * - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#exceptions
       * - https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage#exceptions
       */
      return fallback;
    }
  }
  
  export const fallbackStorage = new FallbackStorage();
  export const localStorage = getStorage('localStorage', fallbackStorage);
  