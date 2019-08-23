import { concat } from 'lodash'
import getUid from './uid'

const loopFiles = (item) => {
  return new Promise((resolve, reject) => {
    const dirReader = item.createReader()
    let fileList = []

    function sequence () {
      dirReader.readEntries((entries) => {
        const entryList = Array.prototype.slice.apply(entries)
        fileList = fileList.concat(entryList)
  
        // 检查所有文件
        const isFinished = !entryList.length
  
        if (isFinished) {
          resolve(fileList)
        } else {
          sequence()
        }
      })
    }
  
    sequence()
  })
}

const getFileObject = (item, isAccepted) => {
  return new Promise((resolve, reject) => {
    item.file((fi) =>{
      if (isAccepted(fi)) {
        resolve(fi)
      } else {
        resolve(null)
      }
    })
  })
}

const traverseFileTree = (files, isAccepted) => {
  const _traverseFileTree = (item, path = '') => new Promise((resolve, reject) => {
    if (item.isFile) {
      getFileObject(item, isAccepted).then((fi) => {
        if (fi) {
          fi['uid'] = getUid()
          fi['fullPath'] = `${path}${fi.name}`
          resolve(fi)
        } else {
          resolve(null)
        }
      })
    } else if (item.isDirectory) {
      loopFiles(item).then((entries) => {
        const promiseArr = entries.map((entryItem) => {
          return _traverseFileTree(entryItem, `${path}${item.name}/`)
        })
        Promise.all(promiseArr).then((res) => {
          let resultArr = []
          res.forEach(target => {
            if (target instanceof Array) {
              resultArr = concat(resultArr, target)
            } else if (target) {
              resultArr.push(target)
            }
          })
          resolve(resultArr)
        })
      })
    } else {
      resolve(null)
    }
  })

  const actionArr = []
  for (const file of files) {
    // console.log(file)
    // console.log(file.webkitGetAsEntry())
    actionArr.push(_traverseFileTree(file.webkitGetAsEntry()))
  }
  return actionArr
}

export default traverseFileTree
