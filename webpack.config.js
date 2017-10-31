module.exports = {
  entry: ["./nodeDefinitionIndex.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "nodeDefinition.js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: "./"
  }
};
