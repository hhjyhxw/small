Dockerfile的内容如下，就是将工程构建完毕后的jar包复制到HOME_PATH目录，然后构建镜像：



#maven 打包构建
mvn clean package docker:build