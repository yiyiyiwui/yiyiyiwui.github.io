import{_ as a,c as n,o as p,ah as e,ai as i,aj as l,ak as c}from"./chunks/framework.kZi0S3Z0.js";const m=JSON.parse('{"title":"Docker","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"dev/docker.md","filePath":"dev/docker.md"}'),t={name:"dev/docker.md"};function r(o,s,d,h,k,g){return p(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to “Docker”">​</a></h1><blockquote><p>镜像，容器，数据卷</p></blockquote><h2 id="什么是docker" tabindex="-1">什么是Docker？ <a class="header-anchor" href="#什么是docker" aria-label="Permalink to “什么是Docker？”">​</a></h2><p>官网解释： Docker是一组平台即服务（PaaS）的产品。它基于操作系统层级的虚拟化技术，将软件与其依赖项打包为容器。托管容器的软件称为Docker引擎。 Docker能够帮助开发者在轻量级容器中自动部署应用程序，并使得不同容器中的应用程序彼此隔离，高效工作</p><p>可以这么理解：<br> 项目运行需要运行软件，假如a系统装了软件的函数库和依赖库，b系统上面可能不支持，不兼容，为了解决差异化和不兼容，我们可以把函数库和依赖库放在一个容器中， 一起放在系统内核中运行，系统版本都会依赖系统内核，直接在内核中运行，就解决了差异化和不兼容问题，而这个落地技术就是Docker！</p><h2 id="包含两部分" tabindex="-1">包含两部分 <a class="header-anchor" href="#包含两部分" aria-label="Permalink to “包含两部分”">​</a></h2><p>镜像：把程序需要的依赖库，函数库，环境配置等文件放在一起，就叫做镜像，类似于安装包</p><p>容器：从镜像中拿出来运行的进程就是容器，一个镜像可以运行多个容器，类似于运行环境</p><h2 id="下载安装" tabindex="-1">下载安装： <a class="header-anchor" href="#下载安装" aria-label="Permalink to “下载安装：”">​</a></h2><p>DockerHub (镜像托管平台，但是是国外了，访问下载有点慢)，我们可以用国内的镜像，比如阿里云镜像库，网易云镜像服务等</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>1：yum 包更新到最新 </span></span>
<span class="line"><span>yum update</span></span>
<span class="line"><span>2：安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的 </span></span>
<span class="line"><span>yum install -y yum-utils device-mapper-persistent-data lvm2</span></span>
<span class="line"><span>3: 设置yum源</span></span>
<span class="line"><span>yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"><span>sed -i &#39;s/download.docker.com/mirrors.aliyun.com\\/docker-ce/g&#39; /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span>yum makecache fast</span></span>
<span class="line"><span>4: 安装docker，出现输入的界面都按 y </span></span>
<span class="line"><span>yum install -y docker-ce</span></span>
<span class="line"><span>5: 查看docker版本，验证是否验证成功</span></span>
<span class="line"><span>docker -v</span></span>
<span class="line"><span>6: 启动docker环境</span></span>
<span class="line"><span>systemctl start docker</span></span>
<span class="line"><span>7: 设置开机自启动</span></span>
<span class="line"><span>systemctl enable docker</span></span></code></pre></div><h2 id="配置镜像" tabindex="-1">配置镜像： <a class="header-anchor" href="#配置镜像" aria-label="Permalink to “配置镜像：”">​</a></h2><p>默认情况下都是从dockerhub官网下载镜像 <a href="https://hub.docker.com/" target="_blank" rel="noreferrer">https://hub.docker.com/</a> 但是太慢，所以这里我们用国内的</p><p>创建或修改 /etc/docker/daemon.json 文件，可以用第一个，也可以用第二个</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>中国科技大学镜像地址</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> &quot;registry-mirrors&quot;:[&quot;https://docker.mirrors.ustc.edu.cn&quot;]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>网易云镜像地址</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> &quot;registry-mirrors&quot;:[&quot;http://hub-mirror.c.163.com&quot;]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>阿里云镜像,需要自己手动生成的加速地址:https://cr.console.aliyun.com/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后重启Docker</span></span>
<span class="line"><span>systemctl restart docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>查看是否成功</span></span>
<span class="line"><span>docker info</span></span></code></pre></div><h2 id="常用镜像命令" tabindex="-1">常用镜像命令： <a class="header-anchor" href="#常用镜像命令" aria-label="Permalink to “常用镜像命令：”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>查看本地镜像 </span></span>
<span class="line"><span>docker images</span></span>
<span class="line"><span></span></span>
<span class="line"><span>搜索镜像仓库，推荐：https://hub.docker.com/</span></span>
<span class="line"><span>docker search 镜像名称</span></span>
<span class="line"><span></span></span>
<span class="line"><span>下载（拉取）镜像，镜像名称格式为 名称:版本号</span></span>
<span class="line"><span>docker pull 镜像名称</span></span>
<span class="line"><span></span></span>
<span class="line"><span>删除镜像</span></span>
<span class="line"><span>docker rmi 镜像名称</span></span></code></pre></div><h2 id="容器是什么" tabindex="-1">容器是什么？ <a class="header-anchor" href="#容器是什么" aria-label="Permalink to “容器是什么？”">​</a></h2><p>容器你可以当作一个网站。访问需要有名字，有地址，你现在想要访问，我们就需要先从镜像中取出来一个，放在容器中来运行，</p><p>容器要放在宿主机上运行，什么是宿主机呢？你可以理解为一个小区，小区就是宿主机，每栋楼就是容器，想要访问需要先找到小区地址，再找到对应的楼号 <img src="`+i+`" alt=""> 端口映射就是楼号对应小区，80默认可以不用写</p><h2 id="怎么运行容器" tabindex="-1">怎么运行容器 <a class="header-anchor" href="#怎么运行容器" aria-label="Permalink to “怎么运行容器”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>查看本地容器</span></span>
<span class="line"><span>docker ps 	  # 能查看正在运行</span></span>
<span class="line"><span>docker ps -a  # 能查看所有的容器（运行的和停止的）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创建一个新的容器并运行(-d  后台运行容器，并返回容器ID  -p 主机端口:容器端口  指定映射关系)</span></span>
<span class="line"><span>docker run -d -p 主机端口:容器端口 --name=容器名 镜像名称</span></span>
<span class="line"><span>这里就是运行容器，-d是再后台运行，-p就是映射，然后--name= 是给容器起个名字 然后根据镜像来创建</span></span>
<span class="line"><span>比如创建nginx</span></span>
<span class="line"><span>docker run -d -p 80:80 --name=nginx nginx:latest  后面latest是指定哪个版本，不写就默认是最新的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>进入容器内部</span></span>
<span class="line"><span>docker exec -it 容器名称 bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>启动容器</span></span>
<span class="line"><span>docker start 容器名称</span></span>
<span class="line"><span></span></span>
<span class="line"><span>查看容器日志</span></span>
<span class="line"><span>docker logs 容器名称</span></span>
<span class="line"><span></span></span>
<span class="line"><span>停止容器</span></span>
<span class="line"><span>docker stop 容器名称</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除容器</span></span>
<span class="line"><span>docker rm [-f] 容器名称</span></span></code></pre></div><h3 id="部署mysql" tabindex="-1">部署mysql： <a class="header-anchor" href="#部署mysql" aria-label="Permalink to “部署mysql：”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 创建并启动容器，-e是指定环境，密码是root，然后反斜杠\\是换行，要不然直接回车就执行了。</span></span>
<span class="line"><span>docker run -d -p 3306:3306 --name=mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7 \\   下面是设置字符集为utf-8</span></span>
<span class="line"><span>--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 操作容器中的mysql</span></span>
<span class="line"><span>docker exec -it mysql /bin/bash</span></span></code></pre></div><h3 id="部署tomcat-http-端口号-8080-index-html" tabindex="-1">部署tomcat：<a href="http://xn--6orsb570r:8080/index.html" target="_blank" rel="noreferrer">http://端口号:8080/index.html</a> <a class="header-anchor" href="#部署tomcat-http-端口号-8080-index-html" aria-label="Permalink to “部署tomcat：http://端口号:8080/index.html”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 创建并启动容器</span></span>
<span class="line"><span>docker run -d --name=tomcat -p 8080:8080 tomcat:8.5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#因为tomcat默认没有欢迎页，所以我们在本地模拟一个项目(创建一个hello目录,然后向目录中输出一个文件index.html,内容为hello world)</span></span>
<span class="line"><span>mkdir -p /root/tomcat/webapps/ROOT</span></span>
<span class="line"><span>echo &quot;hello world&quot; &gt; /root/tomcat/webapps/ROOT/index.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 从宿主机复制文件到容器(docker cp 宿主机路径 容器名称:容器路径)</span></span>
<span class="line"><span>docker cp /root/tomcat/webapps/ROOT tomcat:/usr/local/tomcat/webapps/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 操作容器中的tomcat</span></span>
<span class="line"><span>docker exec -it tomcat /bin/bash</span></span></code></pre></div><h3 id="部署redis" tabindex="-1">部署Redis： <a class="header-anchor" href="#部署redis" aria-label="Permalink to “部署Redis：”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 创建并启动容器</span></span>
<span class="line"><span>docker run -d --name=redis -p 6379:6379 redis:5.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 操作容器中的redis</span></span>
<span class="line"><span>docker exec -it redis /bin/bash</span></span></code></pre></div><h3 id="如果里面容器被删了-那么数据也会被删-所以这里我们把数据设置为持久化" tabindex="-1">如果里面容器被删了，那么数据也会被删，所以这里我们把数据设置为持久化 <a class="header-anchor" href="#如果里面容器被删了-那么数据也会被删-所以这里我们把数据设置为持久化" aria-label="Permalink to “如果里面容器被删了，那么数据也会被删，所以这里我们把数据设置为持久化”">​</a></h3><p>可以用数据卷：数据卷就是一个磁盘目录，存在宿主机，将来你这个数据卷放啥， 容器中就会同步更新。想要同步就需要再创建容器的时候挂载这个数据卷</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 创建启动容器时，使用 –v 参数 设置数据卷</span></span>
<span class="line"><span>docker run ... –v 宿主机目录(文件):容器内目录(文件) ...</span></span>
<span class="line"><span># 在/root目录下创建tomcat目录用于存储tomcat数据信息</span></span>
<span class="line"><span>mkdir -p /root/tomcat/webapps</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建容器，设置端口映射、目录映射</span></span>
<span class="line"><span># docker run ... –v 宿主机目录(文件):容器内目录(文件) ...</span></span>
<span class="line"><span>docker run -d --name=tomcat1 -p 8081:8080 -v /root/tomcat/webapps:/usr/local/tomcat/webapps tomcat:8.5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run -d --name=tomcat2 -p 8082:8080 -v /root/tomcat/webapps:/usr/local/tomcat/webapps tomcat:8.5</span></span></code></pre></div><h3 id="注" tabindex="-1">注： <a class="header-anchor" href="#注" aria-label="Permalink to “注：”">​</a></h3><p>镜像都是按照层次来存放的，比如a镜像有1，2，3，4 层。假如我们要再下载b镜像，3，4，5，6，这里我们可以看到都有a已经有3和4了，我们就下载b的时候就不需要再下载一样的了，直接用a镜像的3和4就可以了</p><p>删除镜像的时候要先关闭运行中的容器</p><h3 id="怎么自己制作镜像呢" tabindex="-1">怎么自己制作镜像呢？ <a class="header-anchor" href="#怎么自己制作镜像呢" aria-label="Permalink to “怎么自己制作镜像呢？”">​</a></h3><p><img src="`+l+`" alt=""></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>比如把我们自己的springboot jar包上传。先把我们的jar包放在linux root文件夹下，然后再同一层创建一个\`springboot-dockerfile\`文件，写上指令</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 定义基础镜像（从哪个镜像的基础上开始做）</span></span>
<span class="line"><span>FROM java:8 </span></span>
<span class="line"><span># 定义作者信息（可以省略）</span></span>
<span class="line"><span>MAINTAINER  itheima &lt;itheima@itcast.cn&gt;</span></span>
<span class="line"><span># 将jar包添加到容器，并改名为app.jar</span></span>
<span class="line"><span>ADD springboot-hello-0.0.1-SNAPSHOT.jar app.jar</span></span>
<span class="line"><span># 镜像启动容器的时候，执行的命令</span></span>
<span class="line"><span>CMD java -jar app.jar</span></span></code></pre></div><p>然后我们通过dockerfile构建镜像</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># -f :指定要使用的Dockerfile路径   -t :指定生成的镜像名称   .  镜像构建过程中的上下文环境的目录 	</span></span>
<span class="line"><span>docker build -f ./springboot-dockerfile -t app-itheima .</span></span></code></pre></div><p>查看生成的镜像，并运行容器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>docker images</span></span>
<span class="line"><span>docker run -d -p 18080:8080 app-itheima:latest</span></span></code></pre></div><p>把镜像变成压缩包：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 1、将镜像进行压缩（制作压缩包不能使用iamgeID）</span></span>
<span class="line"><span>docker save -o 压缩文件名称 镜像名称:版本号</span></span>
<span class="line"><span>比如打包我们上面的app-itheima  -o是指定压缩文件的名字，注意后面指定镜像名称不能用iamgeID，要不然解压后没有名字了。。。</span></span>
<span class="line"><span>docker save -o heima.tar app-itheima</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2、解压文件获得镜像</span></span>
<span class="line"><span>docker load –i 压缩文件名称</span></span></code></pre></div><p>以后开发的时候，需要多个容器同时运行，我们还要一个一个创建容器，太浪费时间，所以这里用一个工具</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 安装docekr compose 工具</span></span>
<span class="line"><span>curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-\`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置权限</span></span>
<span class="line"><span>chmod +x /usr/local/bin/docker-compose</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看版本 </span></span>
<span class="line"><span>docker-compose -version</span></span></code></pre></div><p>然后我们可以把需要创建运行的容器写在一个配置文件中，通过命令来管理 <img src="`+c+`" alt=""> 首先我们先创建一个目录</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>mkdir ~/docker-compose</span></span>
<span class="line"><span>cd ~/docker-compose</span></span></code></pre></div><p>然后再创建一个<code>docker-compose.yml</code>文件，同时我们配置的时候可以挂载文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span>services: </span></span>
<span class="line"><span>  nginx:</span></span>
<span class="line"><span>   container_name: my_nginx</span></span>
<span class="line"><span>   image: nginx</span></span>
<span class="line"><span>   ports:</span></span>
<span class="line"><span>    - 80:80</span></span>
<span class="line"><span>  tomcat:</span></span>
<span class="line"><span>   container_name: my_tomcat</span></span>
<span class="line"><span>   image: tomcat:8.5</span></span>
<span class="line"><span>   ports:</span></span>
<span class="line"><span>    - 8080:8080    </span></span>
<span class="line"><span>   volumes: //这里挂载数据卷</span></span>
<span class="line"><span>    - /root/tomcat/webapps:/usr/local/tomcat/webapps</span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>   container_name: my_redis</span></span>
<span class="line"><span>   image: redis:5.0</span></span>
<span class="line"><span>   ports:</span></span>
<span class="line"><span>    - 6379:6379</span></span></code></pre></div><p>之前创建了容器，这里我们先删除</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 删除所有容器</span></span>
<span class="line"><span>docker rm -f \`docker ps -aq\`</span></span>
<span class="line"><span># 这个也可以删除容器，执行此命令的时候，需要和配置文件在同一个目录下</span></span>
<span class="line"><span>docker-compose down</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 然后执行命令,启动容器</span></span>
<span class="line"><span># 执行此命令的时候，需要和配置文件在同一个目录下</span></span>
<span class="line"><span>docker-compose up -d</span></span></code></pre></div>`,51)])])}const u=a(t,[["render",r]]);export{m as __pageData,u as default};
