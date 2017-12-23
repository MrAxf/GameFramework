class AssetLoader{
  constructor(loaders){
    this.unLoadContent = []
    this.loadContentReferences = []
    this.addLoaders(loaders)
  }

  addLoaders(loaders){
    const loaderEntries = Object.entries(loaders)
    for (let [key, value] of loaderEntries){
      this[key] = value
    }
  }

  $addLoadContent(source, content){
    this.unLoadContent = [...this.unLoadContent, ...Object.values(content)]
    this.loadContentReferences = [...this.loadContentReferences, ...Object.keys(content).map(key => [source, key])]
  }

  $load(then = () => 0){
    Promise.all(this.unLoadContent)
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          const source = this.loadContentReferences[i][0]
          const key = this.loadContentReferences[i][1]
          source[key] = values[i]
        }
        this.unLoadContent = []
        this.loadContentReferences = []
        then()
      })
  }
}

export default AssetLoader