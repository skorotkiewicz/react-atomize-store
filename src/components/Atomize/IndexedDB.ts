function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("appDB", 1);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("state");
    };
  });
}

function saveToIndexedDB(key: string, value: any) {
  openDB()
    .then((db: IDBDatabase) => {
      const transaction = db.transaction("state", "readwrite");
      const objectStore = transaction.objectStore("state");
      objectStore.put(value, key);
    })
    .catch((error) => {
      console.error("Error saving to IndexedDB:", error);
    });
}

function getFromIndexedDB(key: string): any {
  return new Promise<any>((resolve, reject) => {
    openDB()
      .then((db: IDBDatabase) => {
        const transaction = db.transaction("state", "readonly");
        const objectStore = transaction.objectStore("state");
        const request = objectStore.get(key);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };
      })
      .catch((error) => {
        console.error("Error getting from IndexedDB:", error);
        resolve(undefined);
      });
  });
}

export { saveToIndexedDB, getFromIndexedDB };
