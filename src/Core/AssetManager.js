
/*
 * @class AssetManager
 * */
export class AssetManager {
/*
 * @class constructor
 * */
  constructor () {
    this.loadedAssets = []
  }

  /*
   * used to load the assets img
   * @async
   * @param {array} assets
   * @return {Promise<any>}
   * */
  async loadAssets (assets) {
    const assetPromises = []

    for (const [assetName, assetUrl] of Object.entries(assets)) {
      const assetPromise = this.loadSingleAsset(assetUrl, assetName)
      assetPromises.push(assetPromise)
    }

    await Promise.all(assetPromises)
  }

  /*
   * used to load a single asset
   * @async
   * @param {string} assetUrl
   * @param {string} assetName
   * @return {Promise<any>}
   * */
  loadSingleAsset (assetUrl, assetName) {
    return new Promise((resolve) => {
      const assetImage = new Image()
      assetImage.onload = () => {
        assetImage.width /= 2
        assetImage.height /= 2

        this.loadedAssets[assetName] = assetImage
        resolve()
      }
      assetImage.src = assetUrl
    })
  }

  /*
   * get an asset by given name
   * @param {string} assetName
   * @return {object}
   * */
  getAsset (assetName) {
    return this.loadedAssets[assetName]
  }
}
