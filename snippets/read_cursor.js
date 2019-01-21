(function () {


var listEntry = (tabid) => {
        let request = indexedDB.open('awake-history-idb');
        request.onsuccess = function(evt) {
            let db = evt.target.result;
            let keyRangeValue = IDBKeyRange.only(tabid);
            let store = db.transaction('awake-tab-history','readonly').objectStore('awake-tab-history');
            let tabIndex = store.index("by_tabid");
            tabIndex.openCursor(keyRangeValue).onsuccess = function(event) {
              var cursor = event.target.result;
              console.log("cursor", cursor);
              if (cursor) {
                console.log("tab value ")
                console.dir(cursor.value);
                cursor.continue();
              }
            };
        };
};


const x = true;

 function change() {
    x = false;
 }

 console.log("x", x);

listEntry(96);
})();