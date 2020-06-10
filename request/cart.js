export let getSetting=()=>{
   return new Promise((resolve,reject)=>{
    wx.getSetting({
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        },
        complete: () => {}
    });
      
   })
}

export let chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
       wx.chooseAddress({
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        },
        complete: () => {}
       });
         
    })
 }


 export let openSetting=()=>{
    return new Promise((resolve,reject)=>{
       wx.openSetting({
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        },
        complete: () => {}
       });
         
    })
 }

 