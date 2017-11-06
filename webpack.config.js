module.exports = {
  /*
  entry: [".\\nodeDefinitionIndex.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "nodeDefinition.js"
  },*/
  entry: {
      '.\\NodeManipulation\\nodeManipulation': '.\\NodeManipulation\\nodeManipulationIndex.js',
      '.\\GameTest\\gameExecution': '.\\GameTest\\gameExecutionIndex.js',
  },
  output: {
      path: __dirname,
      publicPath: "/",
      filename: '[name].js'
  },

  module: {
    loaders: [
      {
        exclude: /node_modules/,  
        loader: "babel-loader",
        query: {
          plugins: ["transform-es2015-modules-commonjs"]
        }
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
