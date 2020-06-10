export let showModal = ({
  content
}) => {
  return new Promise((resolve, reject) => {

    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          resolve(res)

        } else if (res.cancel) {
          console.log('用户点击取消')
          reject(res.cancel)

        }
      }
    })

  })
}


/**
 * params:Object     title:title
 */

export let showToast = ({ title }) => {
  return new Promise((resolve, reject) => {

    wx.showToast({
      title: title,
      icon: "success",
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })

}