export class StorageUtils {
    public static localStorageSave<T>(key: string, value: T): void {
    
        sessionStorage.setItem(key ,JSON.stringify(value));
    }

    public static localStorageRead<T>(key: string): T | null {
        const storedValue = sessionStorage.getItem(key);

        try {
            if(storedValue){
                return JSON.parse(storedValue) as T;
            }
            return null;
        } catch(error){
            sessionStorage.removeItem(key);
            return null; 
        }
    }


}
