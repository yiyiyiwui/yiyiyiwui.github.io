# Linux 常用命令速查手册

## 系统管理

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| **linux镜像网站** | CentOS 6.9 镜像下载 | [https://mirrors.aliyun.com/centos-vault/6.9/isos/x86_64/](https://mirrors.aliyun.com/centos-vault/6.9/isos/x86_64/) |
| `su` | 切换到root用户 | `su` |
| `echo $LANG` | 查看当前系统中默认语言环境变量 | 输出 `en_US.UTF-8` 表示美式英语 |
| `export LANG=zh_CN.UTF-8` | 切换系统环境变量为中文 | `export LANG=zh_CN.UTF-8` |
| `setup` | 查看所有系统服务，带*的会自启动 | `setup` |
| `reboot -w` | 模拟重启但不重启，打印重启的日志 | `reboot -w` |
| `cal 月 年` | 打印日历 | `cal 2023`（打印2023整年） |
| `date` | 显示当前时间 | `date` |
| `useradd` / `userdel` | 添加用户 / 删除用户 | `useradd zhangsan` |
| `wall` | 广播向已登录的用户发送消息 | `wall "系统即将维护"` |
| `df -lh` | 查看磁盘空间 | `df -lh` |
| `passwd` / `su` | 修改用户密码 / 切换用户身份 | `passwd zhangsan` |
| `scp -p test.txt root@111.1.1.1:/home/ok` | 服务器文件传输 | 把当前目录下的test文件推送到指定服务器 |
| `eject` | 弹出光驱 | `eject` |
| `bc` | 计算器 | `bc` |
| `trace` / `traceroute 地址` | 网络诊断工具 | `traceroute www.baidu.com` |
| `free` | 查看服务器内存 | `free -h` |
| `df` | 查看磁盘空间 | `df -lh` |
| `du -sh *` | 查看已满磁盘 | `du -sh *` |
| `crontab -l` | 列出所有的定时任务 | `crontab -l` |
| `iostat` | 硬盘使用状态 | `iostat -x 1` |
| `mpstat` | CPU 使用状态 | `mpstat -P ALL 1` |
| `last` | 登入记录 | `last` |
| `echo "192.168.0.1 hostname" >> /etc/hosts` | 在 hosts 中添加本机实际 IP 和域名的映射 | - |
| `vi /etc/resolv.conf` | 配置信赖的 DNS 服务器 | 添加 `nameserver 114.114.114.114` |
| `w` | 查看系统负载、登录用户等信息 | `w` |

### w 命令输出说明

- **当前时间**：06:31:53
- **系统运行时间**：up 25 days, 9:53
- **用户数**：1 user
- **负载平均值**：1分钟、5分钟、15分钟的平均负载
- **USER**：登录用户
- **TTY**：登录终端
- **FROM**：连接IP
- **LOGIN@**：登录时间
- **IDLE**：空闲时间
- **WHAT**：当前运行的程序

---

## 文件与目录操作

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| `>` | 重定向到新文件（覆盖） | `echo "hello" > file.txt` |
| `>>` | 重定向到文件末尾（追加） | `echo "world" >> file.txt` |
| `\|` | 把两个命令连起来（管道） | `ls -l \| grep ".txt"` |
| `> ok.txt` | 删除文件中的内容，不删除文件 | `> ok.txt` |
| `wc` | 统计行数、单词数、字节数 | `wc -l file.txt` |
| `touch` | 创建文件 | `touch newfile.txt` |
| `mkdir` | 创建一个目录 | `mkdir mydir` |
| `tar -zcvf 名字.tar.gz 文件1 文件2` | 压缩文件 | `tar -zcvf backup.tar.gz file1 file2` |
| `tar -zxvf 压缩包` | 解压文件 | `tar -zxvf backup.tar.gz` |
| `rm 文件` | 删除文件 | `rm test.txt` |
| `rm -f 文件` | 强制删除文件 | `rm -f test.txt` |
| `rmdir 目录` | 删除目录（需为空） | `rmdir emptydir` |
| `less 文件` | 显示大文件内容 | `less large.log`（`+F` 实时跟踪） |
| `cat` / `nl` | 显示小文件内容 | `nl file.txt`（显示行号） |
| `grep -rn --color 关键字 文件` | 搜索关键字（彩色高亮） | `grep -rn --color "error" *.log` |
| `tail -n 4700 aa.log \| more -1000` | 多屏显示 | 空格键翻页 |
| `ctrl+w` | 删除一个命令 | - |
| `ctrl+u` | 删除一整行命令 | - |
| `ctrl+a` / `ctrl+e` | 光标跳转到首 / 尾 | - |
| `alias bd='cd /path/to/target/dir'` | 起别名 | 输入 `bd` 即可进入标记目录 |
| `history` | 查看之前的命令操作 | `history` |
| `xdg-open .` | Linux用图形界面操作当前目录 | `xdg-open .` |
| `scp 1.txt root@136.39.68.18:/tmp` | 传输文件 | 把1.txt传输到指定服务器 |
| `ps -eo pid,lstart,etime \| grep pid` | 查看进程的启动时间和运行时间 | - |
| `jar tf yourfile.jar` | 显示jar里面所有的类名 | `jar tf app.jar \| grep '\.class$'` |
| `unzip -j xxx.jar 全路径类名.class` | 提取class文件到本地 | - |
| `jar uf xx.jar -C . 类名.class` | 替换jar包中指定的类文件 | - |
| `whereis 程序名` | 查找特定程序的安装位置 | `whereis nginx` |
| `which 文件名` | 查找命令位置 | `which java` |
| `cd` / `cd ..` / `cd ../..` / `cd -` / `cd ~` | 目录切换 | 进入/回退/回退两级/回退刚才/回退主目录 |
| `lsof -i:端口号` | 查看端口占用情况 | `lsof -i:8080` |
| `fuser 端口号/tcp` | 查看端口占用进程 | `fuser 8080/tcp` |
| `lsof -a 文件` | 查看文件的进程 | - |
| `ps -ef\|grep java` / `jps -l` | 快速显示运行中的java进程 | - |
| `lsb_release -a` / `cat /etc/*release*` / `uname -a` | 查看所有linux系统版本 | - |
| `lsof +d 目录` | 列出目录下所有文件占用进程 | - |
| `pwdx 进程` | 显示进程所在目录 | `pwdx 12345` |
| `netstat -tulnp \| grep 进程号` | 根据进程号查看端口 | - |
| `netstat -a` | 查看网络的连接状态 | - |
| `ps -ef \| grep 端口号` | 查看指定端口号信息 | - |

---

## 文本搜索与处理

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| `grep -i '关键字' 文件 > result.txt` | 把文件中带有关键字的数据输出到result.txt | `grep -i 'error' app.log > error.txt` |
| `grep -o "关键字" 文件 \| wc -l` | 匹配关键字的数量 | `grep -o "Exception" app.log \| wc -l` |
| `grep -rn --color '关键字' -A10 -B2 文件` | 查看关键字前后相关的内容 | -A 后10行，-B 前2行，-C 前后n行 |
| `grep -C 3 文件` | 查看关键字前后3行日志 | `grep -C 3 "ERROR" app.log` |
| `tailf 文件 > 保存的文件` | 把接下来打印的日志传输到指定文件 | - |
| `sed -n '/2023-01-21,2023-06-11' test.log` | 根据时间范围查询日志 | - |
| `sed -n '/2022-09-27 14:44/,/2022-09-27 14:54/p' 5003.logs > 1.logs` | 找到对应时间段的日志并保存 | 时间可换成关键字 |
| `journalctl --since 1hour ago` | 查看1小时前到现在的日志 | - |
| `journalctl --since "2016-08-04 20:00:00" --until "2016-08-04 20:15:00"` | 查看指定时间段的日志 | - |
| `head` | 显示文件的开头几行（默认10行） | `head -20 file.txt` |
| `tail -n 10 nohup.out \| grep '文字'` | 查看最后10行并搜索 | - |
| `tail -fn 100 nohup.out` | 循环实时查看最后100行日志 | 配合 `\| grep '关键字'` 搜索 |
| `locate 关键字` | 搜索相关的所有文件 | `locate nginx.conf` |
| `locate \*.ps` / `find / -xdev -name \*.ps` | 寻找以 '.ps' 结尾的文件 | - |
| `find / -type f -name "*.txt"` | 寻找系统中以 .txt结尾的所有文件 | - |
| `find /home -type f \( -ctime -10 -o -mtime -10 \) -exec stat -c "%n: Created: %w Modified: %y" {} \;` | 搜索在10天内被创建或者修改过的文件并显示日期 | - |
| `find / -name httpd.conf` | 使用find搜索所有httpd.conf文件 | - |
| `find ./test_wl -name *.txt` | 使用find搜索指定目录下的txt文件 | - |
| `find / -name "syslog"` | 根据文件名查找（可加通配符 *） | - |
| `find /var -size +10M` | 根据文件大小查找（大于+ / 小于-） | - |
| `find -name "*.txt" -atime -7` | 根据文件最近访问时间查找（7天内访问过） | - |
| `find . -name "file" -type f` | 只查找当前目录下的file文件 | - |
| `find . -name "file" -type d` | 只查找当前目录下的file目录 | - |
| `find . -type f -name "*.log" -exec grep -H "关键词" {} \;` | 搜索当前目录下所有log文件中的关键字 | - |
| `du -h *` | 查看当前目录下文件的大小 | - |
| `df -h` | 查看硬盘使用情况 | - |

---

## Java/JVM 相关

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| `jstat -gcutil <pid>` | 查看新生代、老年代、堆内存使用情况 | `jstat -gcutil 12345` |
| `jmap -histo <pid> \| head -20` | 显示进程占用jvm的大小 | `jmap -histo 12345 \| head -20` |
| `jps -l` | 查看启动的jar进程 | `jps -l` |

---

## 下载与网络

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| `curl 'https://...' > wenjian.txt` | 从指定URL下载内容并保存到文件 | - |
| `wget -c http://example.com/file.zip` | 从指定链接下载文件（支持断点续传） | - |
| `chmod u+x ~文件` | 赋予权限 | `chmod u+x script.sh` |
| `cat A.txt > B.txt` | A文件复制到B文件 | - |
| `sftp 用户名@地址` | 登录sftp | `sftp root@192.168.1.100` |
| `ftp 地址` | 登录ftp | `ftp 192.168.1.100` |
| `sudo cat /etc/vsftpd/user_list` | ftp查看有哪些用户 | - |
| `scp root@192.168.1.100:/data/test.txt /home/myfile/` | 从服务器复制文件到本地 | - |
| `scp /home/myfile/test.txt root@192.168.1.100:/data/` | 从本地复制文件到服务器 | - |
| `systemctl status firewalld` | 查看防火墙状态 | - |
| `systemctl start firewalld` | 开启防火墙 | - |
| `systemctl stop firewalld` | 关闭防火墙 | - |
| `firewall-cmd --reload` | 防火墙重载 | - |
| `systemctl restart firewalld` | 重启防火墙 | - |
| `netstat -tunlp` | 查看端口命令 | - |
| `firewall-cmd --list-port` | 查看所有已开放的临时端口 | - |
| `firewall-cmd --add-port=80/tcp` | 添加临时开放端口（如80） | - |
| `firewall-cmd --remove-port=80` | 关闭临时端口 | - |
| `echo > 日志文件名` | 清空日志 | - |
| `service mysql start` | 启动数据库 | - |
| `service mysql stop` | 停止数据库 | - |
| `mysql -P 3306 -h localhost -uroot -p` | 登录MySQL | - |

---

## 网络诊断

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| `ifconfig` | 显示和配置网络接口信息 | `ifconfig` |
| `ping 地址` | 向指定IP或域名发送ICMP回显请求测试网络 | `ping www.baidu.com` |
| `traceroute 地址` / `tracepath` | 跟踪数据包从源到目的地的路径 | `traceroute www.baidu.com` |
| `netstat` | 显示网络统计和连接信息 | `netstat -an` |
| `ss` | 显示当前套接字状态 | `ss -tuln` |
| `route` | 显示和操作内核IP路由表 | `route -n` |
| `nslookup 地址` | 查询DNS记录，获取主机名对应的IP地址 | `nslookup www.baidu.com` |
| `wget` | 下载文件或网页 | `wget http://example.com/file.zip` |
| `curl` | 通过HTTP、FTP等协议传输数据 | `curl http://example.com/api` |

---

## Vim 文本编辑器

| 命令/操作 | 说明 |
| :--- | :--- |
| `k` | 向上移动一行 |
| `j` | 向下移动一行 |
| `h` | 向左移动一个字符 |
| `l` | 向右移动一个字符 |
| `0` | 移动到行首 |
| `$` | 移动到行尾 |
| `gg` | 移动到文件开头 |
| `G` | 移动到文件结尾 |
| `i` | 在光标后插入 |
| `I` | 在行首插入 |
| `o` | 在光标下方新建一行并插入 |
| `O` | 在光标上方新建一行并插入 |
| `Ctrl+v` | 进入可视化块插入模式 |
| `x` | 删除光标所在字符 |
| `dd` | 删除光标所在行 |
| `dG` | 删除光标所在行及以下所有行 |
| `dgg` | 删除光标所在行及以上所有行 |
| `yy` | 复制光标所在行 |
| `p` | 粘贴到光标下方 |
| `P` | 粘贴到光标上方 |
| `u` | 撤销上一步操作 |
| `Ctrl+r` | 重做上一步撤销的操作 |
| `/` | 查找关键字 |
| `n` | 向后查找下一个匹配项 |
| `N` | 向前查找下一个匹配项 |

---

## 文件比较

| 命令/操作 | 说明 | 示例 |
| :--- | :--- | :--- |
| `cmp 文件1 文件2` | 比较两个文件是否相同 | `cmp file1.txt file2.txt` |
| `diff 文件1 文件2` | 准确比较两个文件的差异 | `diff file1.txt file2.txt` |
| `chown 用户 文件名` | 给指定用户所有权 | `chown root file.txt` |

---

## 实用技巧

| 命令/操作 | 说明 |
| :--- | :--- |
| `history \| awk '{CMD[$2]++;count++;} END { for (a in CMD )print CMD[a] " " CMD[a]/count*100 "% " a }' \| grep -v "./" \| column -c3 -s " " -t \| sort -nr \| nl \| head -n10` | 列出你常用的10条命令 |
| `tr -c "[:digit:]" " " < /dev/urandom \| dd cbs=$COLUMNS conv=unblock \| GREP_COLOR="1;32" grep --color "[^ ]"` | 终端动画效果 |
| `jar xf xx.jar` / `jar -cfM0 新jar包名字.jar *` | 解压jar包 / 重新打包 |
| `history` | 查看之前的命令操作 |