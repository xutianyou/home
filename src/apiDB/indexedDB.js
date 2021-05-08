const DB = {
  openDB: async (dbName, storeName, version) => {
    
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

    return await new Promise((resolver, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onupgradeneeded = event => {
        console.log('onupgradeneeded', storeName)
        const result = event.target.result;

        if (typeof(storeName) === 'string') {
          // 创建库中单表
          if (!result.objectStoreNames.contains(storeName)) {
            // 创建数据库
            result.createObjectStore(storeName, { 
              keyPath: 'id',
              autoIncrement: true
            });
          } else {
            console.log("版本更新后，检测到已有数据库，可对数据库进行修改操作");
          }
        } else {
          // 创建库中多表
          storeName.forEach(element => {
            if (!result.objectStoreNames.contains(element.name)) {
              // 创建数据库
              result.createObjectStore(element.name, element.data);
            } else {
              console.log("版本更新后，检测到已有数据库，可对数据库进行修改操作");
            }
          });
        }

      };

      request.onsuccess = () => {
        resolver(request)
      };

      request.onerror = () => {
        reject(false)
      };
    })
  },
  getAllData: async (request, storeName) => {
    return await new Promise((resolver, reject) => {
      const allList = request.result.transaction([storeName], 'readonly')
      .objectStore(storeName)
      .getAll();
  
      allList.onsuccess = () => {
        // 获取UserInformationTable表的全部数据
        resolver(allList.result)
      }

      allList.onerror = () => {
        // 获取UserInformationTable表的全部数据
        reject(false)
      }
    })
  },
  setData: async (request, storeName, data) => {
    return await new Promise((resolver, reject) => {
      const addData = request.result.transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .add(data);
  
      addData.onsuccess = () => {
        resolver(true)
      };
  
      addData.onerror = () => {
        reject(false)
      }
    })
  },
  delData: async (request, storeName, key) => {
    return await new Promise((resolver, reject) => {
      const deleteData = request.result.transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(key);
  
      deleteData.onsuccess = () => {
        resolver(true)
      };
  
      deleteData.onerror = () => {
        reject(false)
      }
    })
  },
  close: (request) => {
    request.result.close();
    console.log('数据库已关闭')
  }
}

// class IndexedDB{
//  constructor(dbName, storeName, version){
//    console.log('constructor')
//      this.storeName = storeName;
//      const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
//      const request = indexedDB.open(dbName, version);

//      request.onsuccess = e => {
//          this.db = e.target.result;
//          console.log('indexDB初始化成功');
//      };
//      request.onupgradeneeded = e => {
//        console.log('onupgradeneeded初始化成功');
//        this.db = e.target.result;
//        if (!this.db.objectStoreNames.contains(storeName)) {
//          this.store = this.db.createObjectStore(storeName);
//        }
//        console.log("数据库创建成功，Version："+version);
//      };
//      request.onerror = e => {console.info('数据库创建失败', e);};
//  }
//  get(key, callback){
//      const transaction = this.db.transaction(this.storeName);
//      const objectStore = transaction.objectStore(this.storeName);
//      const request = objectStore.get(key);

//      request.onerror = e => {console.info('获取失败', e);};
//      request.onsuccess = e => {callback(e.target.result);};
//  }
//  set(key, value){
//      let oldValue;
//      this.get(key, function(res){oldValue = res;});

//      if(oldValue){
//          console.info('请运用更新方法更新！');
//      }else{
//          const transaction = this.db.transaction(this.storeName, 'readwrite');
//          const objectStore = transaction.objectStore(this.storeName);
//          const request = objectStore.add(value, key);

//          request.onerror = e => {console.info('添加失败', e);};
//      }
//  }
//  update(newValue, key){
//      this.get(key,(oldValue)=>{
//        if(!oldValue){
//            console.info('请用set方法设置值');
//        }else{
//            const transaction = this.db.transaction(this.storeName, 'readwrite');
//            const objectStore = transaction.objectStore(this.storeName);
//            const request = objectStore.put(newValue, key);

//            request.onerror = e => {console.info('更新失败', e);};
//        }
//      });
//  }
//  remove(key){
//      const request = this.db.transaction(this.storeName, 'readwrite')
//              .objectStore(this.storeName)
//              .delete(key);
//      request.onerror = e => {console.info('删除失败', e);};
//  }
//  delete(name){
//      window.indexedDB.deleteDatabase(name);
//  }
//  close(){
//      this.db.close();
//  }
// }

export default DB
