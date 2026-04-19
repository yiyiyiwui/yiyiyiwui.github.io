# 🎯 Java面试宝典

## 第一章：Java基础
### 面向对象三大特征
- **封装** 保安全（数据不乱改）：防止"脏数据"污染数据库，保证业务逻辑的严密性
- **继承** 省代码（共性不重写）：代码复用，减少重复劳动。修改父类，所有子类自动生效
- **多态** 防僵化（扩展不修改）：消除 if-else，系统扩展性极强。新增设备类型时，只需新增一个类，不需要修改核心业务代码


---
### JDK、JVM、JRE的区别？
- JDK：Java开发工具包，提供编译、调试、运行Java程序的工具
- JVM：Java虚拟机，负责将字节码转换为机器码执行，实现跨平台
- JRE：Java运行时环境，包含JVM和核心类库，只能运行不能开发
- 关系：JDK包含JRE，JRE包含JVM
---
### JVM
#### JVM包含什么？
- 类加载器：
  负责：把你的 .class 文件放进来

- 执行引擎：
  负责把你的 .class翻译成机器能听懂的指令

- 内存区域：

**堆**：存放对象实例（比如你new的对象）。这是空间最大的地方，GC主要在这里工作

**栈**：每个线程一个。存放局部变量。

**本地方法栈**：调用c++等本地接口。

**方法区**：存放类信息、常量、静态变量。

**程序计数器**：记住当前执行到哪一行，线程切换后能继续

- 垃圾回收器（ 清洁工）：
  负责盯着"堆仓库"，看到没人用的对象（废料）就把它扔掉，腾出空间

```
JVM内存结构图：
┌─────────────────────────────────────┐
│                 堆                   │  ← new出来的对象都在这
│  ┌──────────────┐  ┌─────────────┐  │
│  │   新生代      │  │   老年代    │  │
│  │ Eden|S0|S1   │  │             │  │
│  └──────────────┘  └─────────────┘  │
├─────────────────────────────────────┤
│           方法区（元空间）            │  ← 类信息、常量
├──────────────────┬──────────────────┤
│   虚拟机栈（线程A）│  虚拟机栈（线程B）│  ← 每个线程一个
├──────────────────┴──────────────────┤
│              程序计数器               │  ← 记录执行行号
└─────────────────────────────────────┘
```

---

### Java垃圾回收机制？

Java自动帮你清理没用的对象，不需要手动释放内存（像C/C++那样）

**判断是否该回收**：可达性分析（从GC Roots出发，找不到引用就回收）

**GC Roots包括**：
- 虚拟机栈中的局部变量
- 静态变量
- 常量池中的引用

**常用垃圾收集器**：
- **G1**（推荐）：均衡吞吐量和延迟，JDK9默认
- **ZGC**：超低延迟，停顿<10ms
- **ParNew+CMS**：老项目常用

---

### Java 堆内存排查命令
```java
jps                          # 查看 Java 进程 PID
jmap -heap <pid>             # 查看堆内存使用情况
jmap -histo <pid>            # 查看对象实例数量排行
jmap -dump:file=heap.hprof <pid>  # 导出堆快照
# 然后用 MAT 工具分析 heap.hprof，找内存泄漏
jstat -gcutil <pid> 1000     # 每秒监控 GC 情况
```
###  JVM 优化
- JVM 结构

JVM 里面有一块最大的区域叫堆，专门用来存 new 出来的对象。堆里面又分两块：一块叫新生代，一块叫老年代。
"新生代就像一个托儿所，新来的对象都放这里。托儿所住满了，就来一次小扫除，把没用的对象清掉。清了之后活下来的对象，如果在托儿所里住够了一段时间，就搬去老年代，老年代就像养老院，住的都是老对象。"
"养老院也有住满的时候，住满了就来一次垃圾回收。垃圾回收的时候，整个程序必须停下来等，不能干任何事，用户发过来的请求也得等。大扫除做完了程序才继续跑。
用户感受到的就是：哎，这个接口突然卡了好几秒。这个停下来等的状态，英文叫 STW

- 怎么发现问题

第一，用户反馈接口卡，特别是偶尔卡个几秒，这往往就是大扫除造成的；第二，监控里看到内存一直涨，GC 之后也降不回去，说明有东西一直占着内存不放，这叫内存泄漏。
发现异常之后，我会用一个命令叫 jstat，格式是 jstat -gcutil 进程号 1000，意思是每隔一秒打印一次当前 GC 状态。
我主要盯两列：一列是 FGC，就是大扫除发生了几次；另一列是 FGCT，大扫除总共花了多长时间。如果大扫除很频繁，或者每次要好几秒，就说明必须优化了。

- 优化方案

一个是业务代码层面，一个是 JVM 参数层面。
业务代码上，把那个一次查 10 万条改成分页查，每次只查 500 条，处理完再查下一批，内存压力立刻小了很多。
JVM 参数上，主要改了几个地方：
第一，把堆内存的初始值和最大值都设成一样大，我们服务器是 32G 内存，给这个服务分了 8G，写法是 -Xms8g -Xmx8g。为什么要设成一样？因为如果设不一样，程序刚启动内存小，跑着跑着内存不够了自动扩容，扩容这个动作本身也会触发一次大扫除，多此一举。
第二，选 G1 的垃圾回收器，写法是 -XX:+UseG1GC，同时加了个参数 -XX:MaxGCPauseMillis=200，意思是告诉 G1，你每次大扫除尽量别超过 200 毫秒。G1 会尽力满足这个要求，实际效果比老的收集器好很多。
第三，加了一个参数，万一内存真的撑爆了，自动把当时的内存状态保存成一个文件，方便事后分析，写法是 -XX:+HeapDumpOnOutOfMemoryError。

### 双亲委派模型？

类加载时，先问上级"你有没有加载过这个类？"有了就用现成的，没有才自己加载。就像公司报销，先问上级能不能批，不行再自己处理。

**作用**：防止核心类被篡改（你自己写个java.lang.String不会生效，因为父级已经加载了）

```
用户自定义类加载 → 先问应用类加载器
应用类加载器 → 先问扩展类加载器
扩展类加载器 → 先问启动类加载器（加载JDK核心类）
                     ↓ 没有才自己加载
```

---

### String、StringBuffer、StringBuilder区别？

- String就像刻在石头上，改一次就刻一块新石头
- StringBuffer是橡皮泥，可以改，但改的时候要排队（加锁）
- StringBuilder是橡皮泥，可以改，不用排队（不加锁，更快）

---

### ==和equals的区别？
- == 比较基本数据类型是比较数值，比较引用数据类型是比较地址
- equals是比较两个对象的内容是否相等

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);       // false，两个不同对象，地址不同
System.out.println(a.equals(b));  // true，内容一样

// 注意：Integer缓存坑
Integer x = 127;
Integer y = 127;
System.out.println(x == y);  // true，-128到127有缓存，是同一对象

Integer m = 128;
Integer n = 128;
System.out.println(m == n);  // false，超出缓存范围，不同对象
```

---

### 接口和抽象类的区别？
- 接口：只定义规范，没有具体的实现代码,需要类实现接口定义方法
- 抽象类：既可以包含具体方法实现，又可以包含抽象方法声明的类
  接口主要用于定义规范和实现多态性，抽象类主要用于被继承和代码复用

---

### 浅拷贝和深拷贝？
- 浅拷贝：浅拷贝是拷贝对象中的基本数据类型和对象的引用
- 深拷贝：深拷贝除了复制基本数据类型的值外，还会创建一个全新的对象，并复制包括子对象在内的所有内容

---

### 什么是内存泄漏？
- Java内存泄漏是指在程序中不再使用的对象仍然被占用内存，无法被垃圾回收器回收释放，最终导致内存资源的浪费和程序性能问题。
- 造成内存泄漏的原因：对象引用未及时释放、集合类未正确使用、资源未正确释放、循环引
- 避免泄漏：及时释放不再使用的对象和资源，正确使用集合类。

## 第二章：集合

### 集合体系总览

Java的容器家族，根据不同需求选不同容器

```
Collection（集合）
├── List（有序可重复）
│   ├── ArrayList（数组，查快增删慢）
│   └── LinkedList（链表，增删快查慢）
├── Set（不可重复）
│   ├── HashSet（无序，最快）
│   ├── LinkedHashSet（按插入顺序）
│   └── TreeSet（自然排序）
└── Queue（队列）
    └── LinkedList

Map（键值对）
├── HashMap（无序，最快，不安全）
├── LinkedHashMap（按插入顺序）
├── TreeMap（按key排序）
├── HashTable（线程安全，效率低）
└── ConcurrentHashMap（线程安全，效率高）
```

---

### ArrayList和LinkedList区别？

- ArrayList像数组格子，通过编号直接找到位置（查快），但插入要把后面的格子全部移动（增删慢）
- LinkedList像链条，每个节点记着下一个在哪，插入只需要改一下指向（增删快），但找第100个要从头数（查慢）

---
### 线程安全的 List 有哪些

CopyOnWriteArrayList:读操作不上锁，写操作复制一份新数组在副本上修改，改完再把原数组指向新数组。这样读和写操作的是不同数组，互不干扰。

就像你有一本书（原数组），很多人同时在看（读操作）。你想在书上加一页，你不能直接加（因为有人在看），所以你复印一本新书，在新书上加，加完后告诉大家：以后看这本新书。

用了ReentrantLock锁机制

---
### 时间速度对比，从快到慢？
**O(1)**：哈希表查找、数组下标   - 上帝视角

**O(log n)** ：二分查找、平衡树操作   - 排除法，比如这个数比你大还是小，当数据量从 100 翻倍到 1 万（扩大 100 倍）时，他的工作量只翻了 2 倍

**O(n)**     ：简单搜索、链表遍历   - 点名法，一个一个问，当数据量从 100 翻倍到 1 万（扩大 100 倍）时，他的工作量也跟着翻了 100 倍

**O(n log n)** ：快排、归并、堆排   - 分头行动,	先分成小堆各自排序，再合并

**O(n²)**    ：冒泡、插入（最坏）、选择   - 嵌套点名	每个人都要和所有人比一次

---

### HashMap底层原理？

HashMap内部使用一个**数组来存储元素**，数组的每个元素被称为桶，默认初始容量是16。桶的数量由HashMap的容量确定，容量即数组的长度，**键是唯一的，而值可以重复**。HashMap使用键的哈希码（hash code）来确定存储位置。

如果发生了哈希碰撞，在桶上面存储的元素一样时，会生成链表，当链表长度到达8，且数组长度到达64，就会生成红黑树，如果存储的元素数量超过了容量的75%时，就会扩容，HashMap 的扩容操作会导致哈希表的大小变为原大小的两倍，并重新计算和分配元素的桶位置。

---

### ConcurrentHashMap为什么比HashMap安全？

- HashTable：多线程同时存储时，可能两个线程同时判断某个位置为空然后写进去，导致数据覆盖丢失
- ConcurrentHashMap：使用了分段锁，保证线程安全

---

### HashSet如何检查重复？
HashSet底层就是HashMap，存的是键，值是个固定的占位Object。判断重复先比hashCode（快速过滤），再用equals（精确比较）。

---
### HashSet如何检查重复？
- 使用一个新的哈希函数再计算这个哈希码
- 为哈希表分配额外的存储区域，用于存储碰撞的元素

---

## 第三章：多线程

### 创建线程的方式？

就像安排人干活，有4种方式

```java
// 方式1：继承Thread（不推荐，Java单继承限制）
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
}
new MyThread().start();

// 方式2：实现Runnable（推荐，可以继承其他类）
Thread t = new Thread(() -> {
    System.out.println("Runnable执行");
});
t.start();

// 方式3：实现Callable（有返回值）
FutureTask<String> task = new FutureTask<>(() -> {
    return "任务结果";
});
new Thread(task).start();
String result = task.get();  // 获取结果，会阻塞等待

// 方式4：线程池（最推荐）
ExecutorService pool = new ThreadPoolExecutor(
        5,                          // 1. corePoolSize (核心线程数)
        10,                         // 2. maximumPoolSize (最大线程数)
        60L,                        // 3. keepAliveTime (空闲存活时间)
        TimeUnit.SECONDS,           // 4. unit (时间单位)
        new ArrayBlockingQueue<>(100), // 5. workQueue (任务队列，这里指定容量为100)
        Executors.defaultThreadFactory(), // 6. threadFactory (线程工厂，用默认的就行)
        new ThreadPoolExecutor.AbortPolicy() // 7. handler (拒绝策略，满了怎么办)
);
        pool.submit(() -> System.out.println("线程池执行"));
        pool.shutdown();
```

---

### 线程池7个核心参数？

1. 核心线程数（corePoolSize）：核心线程数，即使空闲也不销毁
2. 最大线程数（maximumPoolSize）：最大的线程数量
3. 非核心线程等待时间（keepAliveTime）：非核心线程空闲多久后销毁
4. 时间单位（unit）：秒/分钟/小时
5. 任务队列（workQueue）：核心线程满了任务先进队列
6. 线程工厂（threadFactory）：可以给线程起名方便排查问题
7. 拒绝策略（handler）：队列满了且线程数到最大时怎么处理新的任务

---

### 线程池工作流程？

1. 有空闲（核心线程）→ 直接服务
2. 都忙 → 先等位（进队列）
3. 等位满了 → 找临时工（非核心线程）
4. 临时工也满了 → 执行拒绝策略

```
提交任务
  ↓
核心线程数未满？ → 是 → 创建核心线程执行
  ↓ 否
等待队列未满？ → 是 → 放入队列等待
  ↓ 否
线程数未到最大？ → 是 → 创建非核心线程执行
  ↓ 否
执行拒绝策略
```

---

### 线程池的拒绝策略有哪些？
1 默认策略： 抛出异常，表示拒绝处理任务

2 丢弃老任务，执行新的任务

3 直接丢弃新的任务，不做任何处理。

4 只要线程池没有关闭，就由提交任务的当前线程处理。

---
### 线程的状态？
#### 6种状态

**创建状态**：new 的时候就是创建

**就绪状态**：调用start，启动好了，变成就绪状态

**阻塞状态**：当运行的时候，调用sleep，wait或同步锁定时，线程进入阻塞状态，阻塞接触后，变成就绪状态，再等待cpu调度

**运行状态**：等待cpu调度后进入运行状态

**超时等待状态**：设置时间等待，时间到了后，线程会主动结束等待状态，继续往下执行其他操作。目的是控制线程的执行时间，避免线程一直阻塞在等待状态

**死亡状态**：执行完后变成死亡状态

#### 关键方法：
Priority：更改线程的优先级

sleep：指定正在执行的线程休眠多少毫秒

**join：插队，能够按照指定顺序执行**

isAlive：测试线程是否存活

---
### synchronized和Lock区别？

- synchronized：自动上锁解锁，就像自动门，进去自动锁，出来自动开
- Lock(ReentrantLock)：手动上锁解锁，功能更多，但忘了解锁就死锁

---

### volatile（沃了提欧）关键字作用？

- 可见性：A改了变量，B能立刻看到最新值（不从本地缓存读）
- 禁止重排序：代码按你写的顺序执行，不乱序

使用场景：一个线程负责更新某个开关，其他线程根据开关决定是否干活，比如有一个抢红包活动，我在页面关掉后，其他线程不知道，还在抢，但是有了线程可见性后，可以避免这个问题

---
### sleep 和 wait 的区别

**sleep()**：来自 Thread 类。它执行时手里还紧紧攥着锁，别人进不来。时间到了自动醒。
**wait()**：来自 Object 类。它执行前必须把锁交出来，让别人先用。必须等别人喊它（notify）才能醒。

---
### CAS 原理，CAS 的 ABA 问题
**原理**：比较并交换，"我觉得这个值现在是 A，如果是，我就改成 B；如果不是，说明被别人改过了，我重试。

**ABA问题**：你卡里有 100 块，你取了 50，由于网络延迟发了两次请求。第一次扣款成功（剩50），这时你妈给你转了 50（变回100）。第二次请求一看“咦，还是 100”，又扣了你 50。
解决办法：加版本号

---
### 乐观锁和悲观锁
悲观锁：肯定有人跟我抢，先锁上再说，适合写多读少

乐观锁：应该没人跟我抢，冲突了再说，适合读多写少

---
### JUC的使用
Java 并发工具包

常用类：线程安全的 Map	ConcurrentHashMap、线程安全的 List	CopyOnWriteArrayList（读多写少）、线程池ThreadPoolExecutor

---
### AQS 是什么？
JUC 包下的一个核心基础框架，它的主要作用就是管理线程的排队和阻塞

---
### ThreadLocal是什么？

每个线程专属的小抽屉，线程A放进去的东西，线程B看不到，各不干扰

**主要用途**：
1. 存储当前登录用户信息（不用到处传参）
2. 数据库连接（保证同一线程用同一个连接）
3. 日期格式化对象（SimpleDateFormat非线程安全）

## 第四章：网络与Web

### TCP三次握手四次挥手？
**三次握手**

客户端：我要连你（SYN）

服务端：好的，我准备好了（SYN+ACK）

客户端：知道了，开始发数据（ACK）

**四次挥手**

客户端：我发完了，我要关了（FIN）

服务端：知道了（ACK）

服务端：我也发完了，关吧（FIN）

客户端：好的（ACK）


---

### 过滤器和拦截器区别？
- 过滤器：大门保安，所有人都要过（Servlet级别），跨域处理、全局日志记录、防 SQL 注入/XSS 攻击、黑白名单
- 拦截器：公司前台，进了门才遇到（Spring级别），登录校验、权限控制、性能监控
---
### Cookie和Session的区别

Cokiehe和Session都是用来**存储用户状态信息**的，比如登录状态和身份验证。

Cookie：存储位置(浏览器),用来记住登录状态

Session：存储位置(服务器),保存用户信息

### 从输入URL到页面展示，发生了什么？
DNS解析 → TCP连接 → 发送HTTP请求 → 服务器处理 → 返回响应 → 浏览器渲染

### HTTP和HTTPS的区别
HTTPS多了一层SSL/TLS加密，端口不同（80/443），需要证书

### 什么是跨域？怎么解决？
浏览器安全策略，A网站不能访问B网站的数据。
CORS（后端加响应头）、代理转发


## 第五章：Spring
框架主要以ioc（控制反转）和aop（面向切面编程）为核心，极大的简化了代码
### Spring IOC是什么？

以前你要用一个对象，要自己new；用了IOC，告诉Spring我要用这个，Spring自动给你，你不用管怎么创建的


---

### Spring AOP是什么？

不改原来代码，在方法执行前/后/出错时插入额外逻辑。

**主要用途**：日志记录、事务管理、权限校验、接口耗时统计

---

### 动态代理是什么？
在不改原始类代码的情况下，给对象动态增加功能。

---
### @Transactional 底层原理
它是 Spring 提供的声明式事务注解。加上它之后，方法里的所有数据库操作会被包在一个事务里，要么全部成功提交，要么全部失败回滚。

---
### SpringBean生命周期？

从实例化到销毁的整个过程

**对象实例化**：在 Spring 容器启动时，根据配置或注解，这个时候只是将对象实例化了，对象内的属性还未设置

**属性赋值**：容器会将配置的属性值或依赖注入到 Bean 实例中。这可以通过 setter 方法、字段注入或构造函数注入来完成。

**对象初始化**：在初始化前回调执行完毕后，Bean 实例处于已初始化的状态

**使用**：在这个阶段，可以进行一些自定义的初始化逻辑操作。

**销毁**：Bean 实例将被销毁，占用的资源被释放。

```java
@Component
public class MyBean implements InitializingBean, DisposableBean {

    // 1. 实例化（new对象）

    // 2. 属性注入
    @Autowired
    private UserService userService;

    // 3. 初始化前（BeanPostProcessor可以在这里修改Bean）

    // 4. 初始化
    @PostConstruct  // 推荐用这个
    public void init() {
        System.out.println("Bean初始化完成，可以做一些初始化工作");
        // 比如：连接池预热、缓存加载
    }

    @Override
    public void afterPropertiesSet() {
        // 也是初始化方法（实现InitializingBean接口）
    }

    // 5. 使用Bean（正常业务逻辑）

    // 6. 销毁
    @PreDestroy  // 推荐用这个
    public void cleanup() {
        System.out.println("Bean销毁，释放资源");
        // 比如：关闭连接、保存状态
    }
}
```
---

### Spring事务传播行为（7种）？
**事务传播行为**：出差吃饭	一个事务 ，出差打车	另一个事务 ，报销时	是合并成一张单子，还是分开两张单子？

方法A调用方法B时，B的事务怎么处理

```java
// 最重要的两种：

// REQUIRED（默认）：有就加入，没有就新建
// 场景：大部分业务方法用这个
@Transactional(propagation = Propagation.REQUIRED)
public void saveOrder() {
    // 如果外层有事务就加入，没有就自己开启事务
}

// REQUIRES_NEW：不管外层有没有事务，我自己新开一个
// 场景：记录日志（就算外层事务回滚，日志也要保存）
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void saveLog() {
    // 总是新开事务，与外层事务互不干扰
}
```

---
### 什么是事务？
事务就是"要么全做，要么全不做"

### Spring事务失效场景？
1：不是public修饰（Spring AOP 代理默认只拦截 public 方法）

2：非事务方法调用本类中事务方法（调用的是 this 对象，不是代理对象。）

3：异常被捕获（事务管理器没看到异常，以为方法执行成功了）

4：事务传播行为错误（传播行为设置不对，导致方法没有在事务中执行）

5：回滚异常类型不匹配（Spring 默认只回滚 RuntimeException，不会回滚 Exception）

6：没有被Spring管理（@Transactional 是 Spring 的功能，对象必须由 Spring 创建才能生效）

```java
// 坑1：同类方法调用（最常见！）
@Service
public class OrderService {
    public void createOrder() {
        this.pay();  // 这样调用，pay的事务不生效！
    }

    @Transactional
    public void pay() { ... }
}
// 原因：@Transactional通过AOP代理实现，this调用绕过了代理
// 解决：注入自己，用代理对象调用
@Autowired
private OrderService self;  // 注入自身代理

public void createOrder() {
    self.pay();  // 通过代理调用，事务生效
}

// 坑2：异常被吃掉
@Transactional
public void save() {
    try {
        doSomething();
    } catch (Exception e) {
        log.error("出错了", e);
        // 没有重新抛出！事务不会回滚
    }
}
// 解决：catch后手动回滚或重新抛出
@Transactional(rollbackFor = Exception.class)
public void save() {
    try {
        doSomething();
    } catch (Exception e) {
        log.error("出错了", e);
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        throw new RuntimeException(e);  // 重新抛出
    }
}

// 坑3：方法非public
@Transactional  // 不生效！
private void save() { ... }
// 解决：改为public

// 坑4：抛出检查异常（默认只回滚RuntimeException）
@Transactional  // 如果抛IOException，不会回滚
public void save() throws IOException { ... }
// 解决：指定rollbackFor
@Transactional(rollbackFor = Exception.class)
public void save() throws IOException { ... }
```

---
### 

脏读：读到别人还没提交的数据

不可重复读：同一个事务内，两次读同一行数据，结果不一样

幻读：同一个事务内，两次查询，数据条数不一样

---


### Spring中的事务隔离级别?
当两个事务对同一个数据库的记录进行操作时，那么，他们之间的影响是怎么样的呢?这就出现了事务隔离级别的概念

读未提交 ：什么也没解决

读已提交：解决了脏读

可重复读 ：在同一个事务内，多次查询数据是一样的，没有解决幻读

串行化：所有事务按顺序依次执行

怎么解决？

用MVCC方案：多版本并发控制
多版本并发控制。写数据时，不直接覆盖原数据，而是生成一个新版本。读数据时，选择哪个版本来读。每个人都有自己的"快照"，你读的时候，读的是你事务开始时的那个版本。

---
### Spring循环依赖如何解决（三级缓存）？

需要B，B需要A，互相等对方先出生，就死锁了。Spring用"早期引用"解决：A先出生一个半成品，把半成品给B用，B完成了再回来把A补全。

1：使用 `@Lazy` 延迟注入：通过在循环依赖的 bean 上添加 `@Lazy` 注解，可以延迟注入属性，从而避免循环依赖问题。

2：使用 `@Autowired` 和构造器注入：使用构造器注入而非字段注入时，Spring 容器会在实例化 bean 时传入相应的参数，避免了属性循环依赖的问题。


```
问题：
A在创建过程中需要注入B
B在创建过程中需要注入A
→ 互相等待，死锁！

三级缓存解决：
一级缓存：完整的Bean（成品）
二级缓存：不完整的Bean（半成品，只实例化未注入）
三级缓存：Bean工厂（用于生成早期引用/代理）

流程：
1. 开始创建A，A放入三级缓存（工厂）
2. A需要注入B，开始创建B
3. B需要注入A，从三级缓存取出A的早期引用
4. B创建完成，放入一级缓存
5. A注入B完成，A移入一级缓存
```

---

### Spring的通知是什么?有哪几种类型?
Spring通知是一种面向切面编程（AOP）的概念，在不修改原有业务逻辑的情况下，能够在指定的切点上执行额外的代码逻辑。
通过使用不同类型的通知，可以实现与业务逻辑无关的功能，如日志记录、事务管理等

**前置通知**：在方法执行之前调用。

**后置通知**：在方法执行之后调用，如果方法发生异常则不会被调用。

**异常通知**：在方法发生异常时调用。

**最终通知**：在方法执行之后调用，无论方法是否正常完成都会被调用。

**环绕通知：**包含了方法执行前后的全部流程，需要手动调用目标方法。

## 第六章：数据库SQL

### sql的关键字有哪些？ 分别什么意思？

常见SQL关键字及含义：

- `SELECT`：查询数据，指定要返回的列
- `FROM`：指定查询的表
- `WHERE`：过滤条件，只返回满足条件的行
- `JOIN`：连接多张表（INNER/LEFT/RIGHT JOIN）
- `ON`：JOIN的连接条件
- `GROUP BY`：按某列分组，配合聚合函数使用
- `HAVING`：对分组结果过滤（WHERE不能用聚合函数，HAVING可以）
- `ORDER BY`：排序，ASC升序，DESC降序
- `LIMIT`：限制返回行数，常用于分页
- `INSERT INTO`：插入数据
- `UPDATE ... SET`：更新数据
- `DELETE FROM`：删除数据
- `DISTINCT`：去重
- `IN / NOT IN`：在某个集合内/外
- `LIKE`：模糊匹配，%代表任意字符
- `BETWEEN ... AND`：范围查询
- `EXISTS`：判断子查询是否返回结果
- `UNION / UNION ALL`：合并两个查询结果，UNION自动去重，UNION ALL不去重

---

### 我执行select后，sql底层做了什么？

MySQL执行一条SELECT语句，内部经历了以下步骤：

```
SELECT * FROM device_data WHERE factory_id = 1 ORDER BY create_time DESC LIMIT 10;

执行流程：
1. 连接器：验证用户名密码，检查权限，建立连接
2. 查询缓存（MySQL 8.0已移除）：8.0之前会先查缓存，命中直接返回
3. 解析器：词法分析（把SQL拆成token）+ 语法分析（检查语法是否合法）
4. 预处理器：检查表名、字段名是否存在，补全*对应的列名
5. 优化器：生成执行计划，决定：
   - 用哪个索引（如果有多个索引，选最优的）
   - JOIN顺序怎么排
   - 是否需要全表扫描
6. 执行器：按执行计划调用存储引擎的接口，逐行读数据
7. 存储引擎（InnoDB）：
   - 先查Buffer Pool（内存缓冲池）
   - 没有再读磁盘，读到Buffer Pool再返回
8. 返回结果给客户端
```

---

### 各大数据库的优缺点对比

| 数据库 | 优点 | 缺点 | 适用场景 |
|--------|------|------|---------|
| **MySQL** | 开源免费、社区庞大、易上手、InnoDB事务支持好 | 大数据量下全文检索弱、JSON支持不如PG | 互联网业务、中小型系统首选 |
| **PostgreSQL（PG）** | 标准SQL支持最完整、JSON/数组类型强、扩展性好（PostGIS地理、pgvector向量） | 配置复杂、DBA门槛高 | 复杂查询、地理信息、需要JSON文档存储场景 |
| **高斯DB（GaussDB）** | 华为出品、兼容Oracle和MySQL语法、分布式支持强、金融级可靠性 | 商业收费、生态相对封闭 | 政企、金融、电信等对国产化有要求的场景（我们DCIM项目用过PG和MySQL，电信有时要求国产化时用高斯） |
| **Oracle** | 性能强、功能最全、稳定性极高 | 授权贵、运维复杂 | 传统金融、电信核心系统 |
| **TiDB** | MySQL兼容、原生分布式、水平扩展 | 小数据量性能不如MySQL | 超大数据量、需要水平扩展场景 |

---

### PostgreSQL为什么比MySQL强？
因为pg用的多进程，mysql用的多线程

---
### sql索引都有哪些？他们分别用来做什么？哪个索引最快？

**按数据结构分**：
- **B+树索引**（最常用，MySQL InnoDB默认）：适合范围查询、等值查询、排序。叶子节点存所有数据，查询效率稳定O(log n)
- **Hash索引**：只支持等值查询，不支持范围查询。等值查询比B+树快（O(1)），但范围查询不适用
- **全文索引（Full-Text）**：专门用于全文搜索，`MATCH ... AGAINST` 语法，比LIKE '%关键词%'快很多

**按功能分**：
- **主键索引**：唯一 + 非空，InnoDB中数据按主键顺序存储（聚簇索引）
- **唯一索引**：保证列值唯一，允许NULL
- **普通索引**：最基础的索引，无唯一性约束
- **联合索引（复合索引）**：多列组合的索引，遵循最左前缀原则
- **覆盖索引**：查询的所有字段都在索引里，不用回表，速度最快

**哪个最快？** 覆盖索引+等值查询最快，因为直接在索引树上找到数据，不需要回表查主键。

---

### sql回表是什么意思？ mysql都有哪些锁？

**回表**：
InnoDB中非主键索引（二级索引）的叶子节点只存主键值，不存完整数据。当查询的字段不在索引中时，需要拿着主键值去主键索引（聚簇索引）再查一次完整数据，这个过程叫"回表"。
比如根据name字段查询到了索引数据name，但是看到索引只有name+id，我就还需要根据id再去表里获取其他age字段等

不需要回表的情况：索引覆盖 = 查询需要的所有字段，索引里都有，不需要回表。

```sql
-- 假设name有普通索引，查询name和age
SELECT name, age FROM user WHERE name = '张三';
-- 1. 走name索引，找到主键id=100
-- 2. 拿id=100去聚簇索引再查一次（回表）才能得到age

-- 避免回表：建联合索引(name, age)，age就在索引里了，不需要回表（覆盖索引）
```

**MySQL的锁**：

按粒度分：
- **表锁**：锁整张表，开销小但并发低，MyISAM常用
- **行锁**：只锁某一行，InnoDB支持，并发高
- **间隙锁（Gap Lock）**：锁两行数据之间的"间隙"，防止幻读（可重复读级别下生效）
- **临键锁（Next-Key Lock）**：行锁+间隙锁的组合，InnoDB默认

按性质分：
- **共享锁（S锁/读锁）**：多个事务可以同时持有，`SELECT ... LOCK IN SHARE MODE`
- **排他锁（X锁/写锁）**：只有一个事务能持有，UPDATE/DELETE自动加，`SELECT ... FOR UPDATE`

按意向分：
- **意向共享锁（IS）**、**意向排他锁（IX）**：表级别的意向锁，提高加表锁的效率

---
### 索引失效场景？

建了索引但没用上

```sql
-- 1. 对索引列做运算/函数（常见坑！）
-- 错误（索引失效）
SELECT * FROM user WHERE YEAR(create_time) = 2024;
-- 正确（索引生效）
SELECT * FROM user WHERE create_time BETWEEN '2024-01-01' AND '2024-12-31';

-- 2. 模糊查询左边有%
-- 错误（索引失效）
SELECT * FROM user WHERE name LIKE '%张';
-- 正确（索引生效）
SELECT * FROM user WHERE name LIKE '张%';

-- 3. 类型不匹配（隐式转换）
-- phone字段是VARCHAR，用数字查（索引失效）
SELECT * FROM user WHERE phone = 13812345678;
-- 正确
SELECT * FROM user WHERE phone = '13812345678';

-- 4. 联合索引不符合最左前缀
-- 联合索引：(name, age, city)
SELECT * FROM user WHERE age = 25;  -- 不走索引（没有name）
SELECT * FROM user WHERE name = '张三';  -- 走索引
SELECT * FROM user WHERE name = '张三' AND age = 25;  -- 走索引

-- 5. 用OR连接非索引列
SELECT * FROM user WHERE name = '张三' OR address = '北京';
-- 如果address没有索引，整个查询都不走索引

-- 查看是否走索引：EXPLAIN
EXPLAIN SELECT * FROM user WHERE name = '张三';
-- 看type列：ref/range 走索引；ALL 全表扫描（不好）
```

---
### Mybatis执行流程？
1：加载配置文件，该配置文件包含了数据库连接信息、映射关系配置等

2：构建会话工厂，创建SqlSession 对象管理 ，SqlSession里面包含了执行 SQL语句的所有方法

3：把java的类型转换为数据库支持的类型，然后把结果映射。

4：关闭资源

---
### MyBatis动态SQL?
if、where、set、foreach、sql片段标签

### MyBatis一级缓存和二级缓存?
默认开启一级缓存，属于sqlSession的，相同的查询结果会被缓存起来，下次再执行相同的查询语句时，直接从缓存中获取，而不会再去数据库查询。

二级缓存：二级缓存是Mapper级别的缓存，它是跨越多个SqlSession对象的。查询结果会被缓存到一个共享的缓存区域中，供多个SqlSession对象共享。

配置开启：在MyBatis的配置文件中，通过cache元素来开启二级缓存

--- 
### 数据库事务ACID特性
原子性：要么全部成功，要么全部失败

隔离性：多个事务之间操作互不影响

一致性：事务执行前后的数据要保持一致

持久性：一个事务一旦提交成功，那么它对数据库的改变就是永久性的


---

### 数据库三大范式（建数据表的规则）
1：列不可再分（一个格子里只能放一个值，不能放一堆东西，比如存储电话号，一个里面只能放一个号码，如果张三有多个号码，要再用一行数据存储）

2：每个列都和主键有关系（选的那个主键，必须能管住所有列。不能有的列跟主键没关系）

3：消除依赖（用外键和其他表关联）

---
### MySQL三大日志？

- binlog：二进制日志（主从复制）
- redo log：重做日志（确保事务的持久性，如果发生故障，会把事务写到磁盘，等再次重启mysql的时候，会再次打开执行）----持久性
- undo log：撤销日志（数据回滚）----原子性

```
写数据流程：
1. 数据写入内存（Buffer Pool）
2. 写redo log（WAL预写日志，顺序写，很快）
3. 事务提交时写binlog
4. 定期把Buffer Pool的数据刷到磁盘

崩溃恢复：
重启时用redo log恢复已提交的事务
用undo log回滚未提交的事务
```
---
### SQL内连接外连接有什么差别?
**笛卡尔积**：是指通过SELECT语句获取两个或多个表的所有可能组合的结果集。

**内连接**：利用where子句对多表连接形成的笛卡尔积进行筛选，说白了**内连接就是获取两个表之间的公共部分内容。**

**左外连接**：获取左表中的全部内容

**右外连接**：获取右表的全部内容


---

### sql怎么优化？

```sql
第一步：发现慢SQL
① 开启MySQL慢查询日志，设置阈值（比如超过1秒记录）：
set global slow_query_log = ON;
set global long_query_time = 1;  -- 超过1秒的SQL记录
② 也可以在代码层面用MyBatis的日志，或者接入SkyWalking等APM工具自动捕获慢SQL并报警。
③ 我们项目里当时查询响应到8秒，是用户反馈页面加载慢，然后我去MySQL里开的慢查询日志找到问题SQL。
第二步：EXPLAIN分析执行计划
找到慢SQL后，在前面加EXPLAIN关键字执行：
EXPLAIN SELECT * FROM device_data WHERE factory_id=1 AND create_time>'2024-01-01';
重点看这几列：
•	type列：ALL是全表扫描（最差），ref/range是走了索引，const是最优；
•	key列：NULL表示没用索引，有值表示用了哪个索引；
•	rows列：预估扫描的行数，越小越好；
•	Extra列：Using filesort是排序没用索引，Using temporary是用了临时表，都是需要优化的信号。
第三步：针对性优化
•	加索引：最直接有效，但要选对字段（区分度高的字段优先）；
•	复合索引注意最左前缀，WHERE条件的字段顺序要和索引一致；
•	避免在索引列上做函数（如WHERE YEAR(create_time)=2024），改成范围查询；
•	大表深分页用WHERE id > last_id LIMIT n代替LIMIT offset, n；
•	SELECT只查需要的字段，不要SELECT *；
•	JOIN查询注意关联字段要有索引；
•	我们的方案：ShardingSphere分库分表+复合索引，8秒降到2秒以内。
好用的工具：
•	MySQL自带：EXPLAIN、慢查询日志、SHOW PROCESSLIST（看当前执行的SQL）；
•	pt-query-digest：分析慢查询日志的利器，能统计出最慢的TOP N SQL；
•	SkyWalking / Arthas：线上追踪慢SQL。
```

---

### mySQL的事务隔离级别是什么？
隔离级别，说白了就是为了解决一个核心矛盾："我想让很多人同时用数据库（高性能），但又不想让他们互相干扰（数据准确）。"

四个隔离级别，MySQL默认是可重复读（Repeatable Read）：

•	**读未提交** —— "看草稿"

场景：小王正在改一个数字，他刚敲了一个"5"，还没按保存。你凑过去一看："哦，是 5"。结果小王觉得不对，把"5"删了，改成了"8"，然后才保存。

你的体验：你看到了一个根本不存在的数字（5）。
后果：你被误导了。这就是"脏读"（读到了脏数据）。

•	**读已提交** —— "看保存后的结果"

场景：小王正在改数字，你凑过去看。系统提示："小王正在编辑，请等他保存完再看"。等小王保存后，你才看到新数字。

你的体验：你第一次看是 100。过了一会儿，小王把 100 改成了 200 并保存。你刷新一下页面，发现变成了 200。
后果：你在同一个文档里，前后两次看到的数据不一样。这就是"不可重复读"。

•	**可重复读** —— "自带时光机"（默认设置）

场景：当你打开文档的那一刻，系统给这个文档拍了一张"快照"（或者叫存档）。

你的体验：不管小王在后面怎么改、怎么保存，你看到的永远是你打开那一刻的样子。哪怕小王把整个表格都删了，你眼里它还是原来的样子，直到你关闭文档重新打开。

后果：你看到的数据非常稳定，不会变来变去。

唯一的小漏洞：虽然内容不变，但如果小王新增了一行数据，你有时候可能会突然看到多出来一行（这就是"幻读"）。

•	**串行化** —— "独占会议室"

场景：这个文档被锁死了。只要你正在看，谁也不许动，连小王也不行。必须等你关掉文档走了，小王才能上去改。

你的体验：绝对安全，绝对不会变。

后果：效率极低。大家都在排队，一个人用，其他人干瞪眼等着。

MySQL InnoDB在可重复读级别下用MVCC（多版本并发控制）解决了不可重复读，用间隙锁（Gap Lock）解决了大部分幻读问题。

--- 
### B+树的特点？
b+树是在b树上的优化，继承了b树的节点下有多个分支的优点。唯一不同的是数据存储结构，b+树的根节点存储的是键值，叶子节点存储的是数据。这样就能根据键值快速找到对应叶子节点的数据了。

---
### 主从复制原理？
主库把操作记在binlog里，从库把日记本拿过来，照着执行一遍。

---
### 怎么保证主从一致？
写完binlog → 等从库确认 → 收到确认 → 返回成功

---
### 聚簇索引和非聚簇索引的区别
聚簇索引 = 索引和数据放一起，一个表只能有一个，一般是InnoDB的主键

非聚簇索引 = 索引和数据分开，可以有多个，一般是普通索引、唯一索引

---
### 行锁和表锁的区别
表锁 = 锁整张表，一个人用大家都等着；UPDATE/DELETE没走索引，或者改表结构，会锁表

行锁 = 只锁你获取的的那一行数据，别人还能操作其他行数据。UPDATE/DELETE走了索引，就是行锁

### ShardingSphere 分库分表 

### 分片键（Sharding Key）是什么？
就是你决定根据哪个字段来拆分数据，一般是高频查询字段，或者一旦确定，后面不会改

---
### 分片策略是什么？
取模分片：根据分片键的值 % 分片数，决定去哪，比如根据id%4

范围分片：按值范围分，比如 1-1000 去表0，1001-2000 去表1，或者2024年1月去表0，2月去表1

## 第七章：Redis

### Redis数据类型及使用场景？

Redis是内存数据库，速度极快，有5种数据结构

```java
// String：键值对
redisTemplate.opsForValue().set("user:1:name", "张三", 30, TimeUnit.MINUTES);
redisTemplate.opsForValue().increment("visit:count");  // 原子自增

// Hash：存对象（比String省空间）
redisTemplate.opsForHash().put("user:1", "name", "张三");
redisTemplate.opsForHash().put("user:1", "age", "25");
Map<Object, Object> user = redisTemplate.opsForHash().entries("user:1");

// List：有序列表（消息队列/最新列表）
redisTemplate.opsForList().leftPush("messages", "消息1");  // 头部插入
redisTemplate.opsForList().rightPop("messages");            // 尾部取出

// Set：不重复集合（去重/共同好友）
redisTemplate.opsForSet().add("online:users", "user1", "user2");
Set<String> members = redisTemplate.opsForSet().members("online:users");

// ZSet：有分数的有序集合（排行榜）
redisTemplate.opsForZSet().add("alarm:priority", "alarm_001", 1.0);  // P1级
redisTemplate.opsForZSet().add("alarm:priority", "alarm_002", 2.0);  // P2级
// 按分数从低到高获取（P1优先处理）
Set<String> alarms = redisTemplate.opsForZSet().range("alarm:priority", 0, -1);
```

---

### 缓存穿透、击穿、雪崩？

- 穿透：查一个不存在的数据（黑客攻击），Redis没有就穿透去查DB，DB也没有，每次都白跑DB

**解决办法**：布隆过滤器 + 空值缓存

- 击穿：击穿是缓存过期，直接击穿

**解决办法**：分布式锁（只让一个请求去查DB）

- 雪崩：大批key同时过期，大量请求同时打DB

**解决办法**：加随机值：给每个key添加不一样的过期时间，不要让他们在同一时间过期

```java
// 穿透解决：布隆过滤器 + 空值缓存
@Service
public class UserService {
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private BloomFilter<Long> bloomFilter;  // Guava布隆过滤器

    public User getUser(Long id) {
        // 1. 布隆过滤器：如果不存在，直接返回null（快速拦截非法ID）
        if (!bloomFilter.mightContain(id)) {
            return null;
        }

        // 2. 查缓存
        String cacheKey = "user:" + id;
        User user = (User) redisTemplate.opsForValue().get(cacheKey);
        if (user != null) return user;

        // 3. 查DB
        user = userMapper.selectById(id);

        // 4. 空值也缓存（防穿透），但过期时间短
        if (user == null) {
            redisTemplate.opsForValue().set(cacheKey, null, 5, TimeUnit.MINUTES);
        } else {
            redisTemplate.opsForValue().set(cacheKey, user, 30, TimeUnit.MINUTES);
        }
        return user;
    }
}

// 击穿解决：分布式锁（只让一个请求去查DB）
public User getUserWithLock(Long id) {
    String cacheKey = "user:" + id;
    User user = (User) redisTemplate.opsForValue().get(cacheKey);
    if (user != null) return user;

    // 加锁，只让一个线程去查DB
    String lockKey = "lock:user:" + id;
    Boolean locked = redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 5, TimeUnit.SECONDS);
    if (Boolean.TRUE.equals(locked)) {
        try {
            user = userMapper.selectById(id);
            redisTemplate.opsForValue().set(cacheKey, user, 30, TimeUnit.MINUTES);
        } finally {
            redisTemplate.delete(lockKey);  // 释放锁
        }
    } else {
        // 等待一下重试
        Thread.sleep(100);
        return getUserWithLock(id);
    }
    return user;
}

// 雪崩解决：过期时间加随机值
long expire = 30 + new Random().nextInt(10);  // 30-40分钟随机
redisTemplate.opsForValue().set(key, value, expire, TimeUnit.MINUTES);
```
---
### 如何保证 Redis 数据与DB 一致？
**1、延时双删**
```java
## 问题
时刻0：线程A（用户"王五"）来下单
       ↓
时刻1：线程A 先删缓存 → Redis里的库存被删了 ✅
       ↓
时刻2：线程A 准备去更新数据库（但这一步比较慢，可能0.5秒）
       ↓
       【就在这时，线程B（用户"赵六"）也来下单】
       ↓
时刻3：线程B 发现缓存没了 → 去数据库查库存
       ↓
时刻4：线程B 读到数据库库存还是10（线程A还没改完） → 把10写回缓存
       ↓
时刻5：线程B 拿着库存10去扣减...
       ↓
时刻6：线程A 终于把数据库改成9 ✅
       ↓
最终：数据库是9，缓存是10 → 不一致！
       后面的人来买，看到缓存还有10，实际只剩9 → 超卖！

## 解决
时刻0：线程A 开始更新库存

时刻1：线程A 先删缓存 ✅（Redis里的库存被删了）

时刻2：线程A 开始更新数据库（比较慢）

        【这时候可能有其他线程来读】
        ↓
时刻3：线程B 来读 → 缓存没了 → 去DB读 → 读到旧值10 → 准备写回缓存
        ↓
时刻4：线程A 更新数据库完成，库存变成9 ✅
        ↓
时刻5：线程A 不着急返回，而是【等待500毫秒】
        ↓
        【在这500ms里，线程B已经把旧值10写回缓存了】
        ↓
时刻6：线程A 等够了 → 【再删一次缓存】✅
        ↓
时刻7：下次有人来读，缓存没了 → 去DB读到9 → 写回9 ✅

最终：缓存和数据库都是9，一致了！
```


**2、异步重试（最推荐，高可用）**

流程：

更新数据库。
尝试删除 Redis。
如果删除失败（网络波动、超时），不要直接放弃。
将"删除 Key"的任务发送到消息队列（MQ）或存入数据库的"重试表"。
后台有个消费者不断监听，发现删除失败的任务，就无限重试，直到删除成功。

**3、Redis 过期删除策略**

流程：

设置过期时间
定时器每秒检查是否过期

**4、Canal（可那奥） + MQ（监听 Binlog）**

流程：

1.你往 MySQL 写数据。

2.MySQL 写入 Binlog。

3.Canal 模拟成 MySQL 从节点，读取 Binlog。

4.Canal 发送消息到 Kafka/RabbitMQ。

5.你的同步程序消费消息，更新 Redis。

●优点：对业务代码零侵入，解耦。

●时延：通常在毫秒级，感官上就是"实时"的。

---
### Redis分布式锁为什么用Redisson？
自己用SET NX实现分布式锁有一个核心问题：锁的过期时间怎么设置是一个难题。

设短了：业务还没执行完锁就自动过期，其他线程抢到锁，产生并发问题；

设长了：如果服务器崩溃没有执行unlock，这个锁会一直占用，其他线程等很久。

Redisson的看门狗（Watchdog）机制完美解决了这个问题：

•	获取锁后，看门狗后台线程每隔 锁TTL/3 的时间自动给锁续期；

•	只要业务还在运行（JVM没崩），锁就不会自然过期；

•	如果JVM崩了，看门狗线程也跟着死了，锁过期后自动释放，不会死锁；

•	正常执行完调unlock()显式释放，通过Lua脚本原子性判断是否是自己的锁再删除，防止误删别人的锁。

---
###  Redis的数据持久化方式？RDB和AOF的区别？
#### Redis有两种持久化方式：

**RDB（快照）：**

定期把内存数据全量写到一个.rdb文件里。优点是文件小、加载快、适合做备份；缺点是可能丢失最后一次快照之后的数据（比如每5分钟快照一次，宕机最多丢5分钟数据）。

**AOF（追加日志）：**

每次写操作都追加记录到.aof文件里。有三种刷盘策略：always（每次写立刻刷盘，最安全最慢）、everysec（每秒刷盘，最多丢1秒数据，推荐）、no（让OS决定，最快最不安全）。优点是数据安全；缺点是文件大，恢复慢。
混合持久化（Redis 4.0+推荐）：
AOF文件里先存RDB格式的全量数据，后面追加AOF格式的增量数据，兼顾安全性和恢复速度。我们生产用的这个模式。


## 第八章：Kafka

### Kafka核心概念？

Kafka就像一个超高速传送带

- Topic：消息的分类，相当于一个队列的名字
- Partition（分区）：Topic被分成多个Partition，每个Partition是一个有序的日志文件，Kafka的高吞吐就来自于分区并行
- Broker：Kafka集群里的每一台服务器叫Broker，我们搭了3个Broker的集群；
- Producer：消息生产者，往Topic里发消息
- Consumer：消息消费者，从Topic里拉消息
- Consumer Group：消费者组,创建一个组，让多个Consumer订阅同一个topic同时消费

```
生产者发消息 → Topic → Partition0 → 消费者A
                      → Partition1 → 消费者B
                      → Partition2 → 消费者C
（3个分区对应3个消费者，并行消费，速度是单个的3倍）
```

---

### Kafka的底层逻辑是什么？为什么Kafka这么强？

Kafka高性能的核心秘密有四个：

**1. 顺序写磁盘**
普通数据库（随机写）,比如第一个数据放那里，第二个数据放这里，Kafka的消息是追加写到日志文件末尾，新来的消息直接往卷轴末尾一接就行了。比随机写快

**2. 零拷贝（Zero Copy）**
传统数据发送：磁盘→内核缓冲区→用户空间→内核Socket缓冲区→网卡，需要4次拷贝。
Kafka用`sendfile`系统调用：磁盘→内核缓冲区→网卡，只需2次拷贝，CPU几乎不参与。

**3. 页缓存（Page Cache）**
Kafka读写都经过OS的页缓存（内存），热数据基本都在内存里，读取速度极快。

**4. 分区并行**
多个分区可以同时读写，充分利用服务器资源

**结合项目**：我们告警Topic单日峰值10万条，3台Broker集群 + 8个分区，轻松支撑，消费延迟基本控制在秒级以内。

---

### Kafka如何保证消息不丢失（项目实战）？

三道保险：生产者确认、Broker存副本、消费者手动确认

```java
// 1. 生产者配置（application.yml）
spring:
  kafka:
    producer:
      acks: all          # 所有副本确认才算发送成功
      retries: 3         # 失败重试3次
      properties:
        enable.idempotence: true  # 幂等性，防重复发送

// 2. 消费者配置
spring:
  kafka:
    consumer:
      enable-auto-commit: false  # 关闭自动提交offset
      auto-offset-reset: earliest

// 3. 消费者代码（手动提交offset）
@KafkaListener(topics = "alarm-topic", groupId = "alarm-group")
public void consumeAlarm(ConsumerRecord<String, String> record,
                          Acknowledgment acknowledgment) {
    try {
        // 业务处理
        AlarmDTO alarm = JSON.parseObject(record.value(), AlarmDTO.class);
        alarmService.processAlarm(alarm);

        // 处理成功才提交offset
        acknowledgment.acknowledge();
        log.info("告警处理成功，offset:{}", record.offset());
    } catch (Exception e) {
        log.error("告警处理失败，进入死信队列", e);
        // 不调用acknowledge，Kafka会重新投递
        // 重试N次后转入死信队列
    }
}

// 4. 死信队列处理
@KafkaListener(topics = "alarm-topic.DLT", groupId = "alarm-dlt-group")
public void handleDeadLetter(ConsumerRecord<String, String> record) {
    // 记录到数据库，人工介入处理
    deadLetterService.save(record.value());
    // 发告警通知给运维人员
    notifyService.sendDingAlert("死信队列有消息，需要人工处理！");
}
```

--- 

### Kafka如何保证消息时效性？
比如消费者积压了很多消息，放进去11:01的，11:10才消费到

**排查和解决思路：**

**1. 监控Consumer Lag**：用 `kafka-consumer-groups.sh --describe` 或Prometheus + Grafana监控每个分区的Lag（积压量），超过阈值（比如1000条）立刻报警。

**2. 扩容消费者**：增加Consumer实例数，但不能超过Partition数量（多余的Consumer会闲置）。我们按需把消费者从4个扩到8个与分区数对应。

**3. 提升消费速度**：
- 消费者内部用线程池异步处理业务逻辑，消费主线程只负责拉消息
- 批量消费（`max.poll.records` 调大）

**4. P1告警双通道保障**：对于时效性要求极高的P1级关键告警，我们设置了MQTT直连设备作为备用通道，即使Kafka积压也能实时到达。

**5. 消息设置TTL**：对时效性要求高的消息，在消息体内加入`expireTime`字段，消费时先检查是否过期，过期直接丢弃不处理，避免处理"过时"数据。

---

### Kafka的分片（分区）策略有哪些？

- **默认策略（轮询）**：消息轮流分配到各个Partition，数据均匀，适合大多数场景
- **Key哈希分区**：指定消息Key，相同Key的消息一定进同一个Partition，保证顺序消费。我们按`factory_id`做Key，同一厂商的告警按顺序处理，避免乱序
- **自定义分区器**：实现Partitioner接口，按业务逻辑分配，比如P1级告警固定分配到高优先级分区
- **随机分区**：随机选一个Partition，适合Key分布不均匀时避免热点

**我们项目的做法**：以`factory_id`为分区Key，8个Partition对应8个消费者线程并行消费，同厂商告警有序处理。

---

### Kafka如何避免重复消费（幂等性）？

就像快递签收，每个包裹有唯一单号，签过了就不签第二次

两个层面：

**生产者幂等性：**
开启 enable.idempotence=true，Kafka会给每条消息分配PID+序列号，Broker检测到重复序列号会去重，保证同一条消息只写一次。

**消费者业务幂等：**
即使Kafka保证了生产侧不重复，消费侧因为重试还是可能重复消费。所以我们在业务层用**Redis SETNX**存消息唯一ID（比如告警ID），消费前先用SETNX判断
这样即使同一条消息被投递两次，业务层也只会处理一次。

```java
@Service
public class AlarmConsumerService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private AlarmMapper alarmMapper;

    public void processAlarm(ConsumerRecord<String, String> record) {
        // 构建唯一消息ID（厂商ID + 设备ID + 告警时间 + 告警码）
        AlarmDTO alarm = JSON.parseObject(record.value(), AlarmDTO.class);
        String messageId = alarm.getFactoryId() + ":" +
                           alarm.getDeviceId() + ":" +
                           alarm.getAlarmTime() + ":" +
                           alarm.getAlarmCode();

        String redisKey = "alarm:processed:" + messageId;

        // Redis检查是否已处理（SETNX原子操作）
        Boolean isNew = redisTemplate.opsForValue()
                .setIfAbsent(redisKey, "1", 24, TimeUnit.HOURS);

        if (!Boolean.TRUE.equals(isNew)) {
            log.warn("重复告警，跳过处理：{}", messageId);
            return;
        }

        // 处理业务逻辑
        try {
            saveAlarm(alarm);
            notifyNetworkMonitor(alarm);
        } catch (Exception e) {
            // 处理失败，删除Redis标记，允许重试
            redisTemplate.delete(redisKey);
            throw e;
        }
    }
}
```
---
### MQ选择
**RocketMQ**：阿里为了双 11 自研的，专门处理复杂的业务逻辑。它支持“事务消息”，能保证你的数据库操作和消息发送要么都成功，要么都失败。适合金融支付、电商核心业务

**Kafka**：数据吞吐量大，适合海量日志采集、实时监控

**RabbitMQ**：特点是延时极低，有管理页面，灵活、反应快，适合中小型项目、实时响应要求高


## 第九章：MQTT

### MQTT协议是什么？

**与HTTP对比**：
```
HTTP：每次请求都要建连接→发数据→关连接（开销大）
MQTT：建立长连接，随时发随时收（像保持通话中）
```

```java
// Spring Boot集成MQTT（使用EMQX作为Broker）
@Configuration
public class MqttConfig {

    @Bean
    public MqttPahoClientFactory mqttFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{"tcp://emqx服务器IP:1883"});
        options.setUserName("admin");
        options.setPassword("password".toCharArray());
        options.setKeepAliveInterval(60);   // 心跳60秒
        options.setAutomaticReconnect(true); // 自动重连
        options.setCleanSession(false);      // 保持会话（断线后消息不丢）
        factory.setConnectionOptions(options);
        return factory;
    }

    // 订阅设备告警Topic
    @Bean
    public MessageProducerSupport mqttInbound(MqttPahoClientFactory factory) {
        MqttPahoMessageDrivenChannelAdapter adapter =
            new MqttPahoMessageDrivenChannelAdapter(
                "dcim-backend-" + UUID.randomUUID(),  // 唯一ClientID
                factory,
                "/factory/+/device/+/alarm"  // 订阅告警Topic，+是通配符
            );
        adapter.setQos(2);  // QoS2：恰好一次，关键告警不丢不重
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }
}

// 消息处理
@Component
public class MqttAlarmHandler {

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleAlarm(Message<String> message) {
        String topic = (String) message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC);
        String payload = message.getPayload();

        // 从topic解析厂商和设备信息
        // topic格式：/factory/{factoryCode}/device/{deviceId}/alarm
        String[] parts = topic.split("/");
        String factoryCode = parts[2];
        String deviceId = parts[4];

        // 解析告警内容并处理
        AlarmDTO alarm = JSON.parseObject(payload, AlarmDTO.class);
        alarm.setFactoryCode(factoryCode);
        alarm.setDeviceId(deviceId);
        alarmService.processAlarm(alarm);
    }
}
```

---

### 解释一下 MQTT 的发布/订阅模式是如何工作的？

MQTT是经典的发布/订阅（Pub/Sub）模式，核心是一个中间人——**Broker（消息代理）**。

```
设备（Publisher）
   ↓ 发布消息到 Topic: /factory/001/device/A01/alarm
MQTT Broker（EMQX）
   ↓ 转发给所有订阅了该Topic的客户端
后台服务（Subscriber）— 订阅了 /factory/+/device/+/alarm
```

**关键点**：
- **发布者和订阅者完全解耦**，互相不知道对方存在，只通过Topic联系
- **Topic支持通配符**：`+` 匹配单层（`/factory/+/alarm` 匹配 `/factory/001/alarm`），`#` 匹配多层（`/factory/#` 匹配所有子Topic）
- **QoS三个级别**：
  - QoS 0：最多一次，可能丢消息（消息发出去就不管了）
  - QoS 1：至少一次，可能重复（我把消息发给你，然后等着你回复“收到了”，如果没有回我就一直重发，直到你回复未知。可能你回复的消息丢了，我没收到，就会再给你一次，然后导致重复）
  - QoS 2：恰好一次，最安全但最慢（多次验证你收到消息）
- **保留消息（Retain）**：Broker保存最后一条消息，新订阅者连上来立刻收到，适合设备状态同步

---

### 如果 MQTT 消息丢失或延迟，你会怎么排查？

**排查步骤**：

1. **先看Broker端**：登录EMQX管理控制台，查看Broker的订阅数、消息速率、连接数是否正常，看是否有消息积压或Broker资源耗尽（CPU/内存）

2. **看网络连接**：检查设备到Broker的连接状态，`netstat -an | grep 1883` 看TCP连接是否正常，ping延迟是否过高

3. **看客户端日志**：查看设备端和后台服务端的MQTT客户端日志，是否有连接断开、重连、发布失败的记录

4. **QoS检查**：确认使用了正确的QoS级别，QoS 0在网络抖动时会丢消息

5. **看CleanSession配置**：如果设置了`cleanSession=true`，断线重连后未接收的消息会丢失，关键场景要设为false

6. **消息补偿机制**：我们项目对告警数据设计了补偿机制——设备端也会定期通过HTTP上报最近N条告警，与平台对账，发现缺失立刻补推

---

### 如果你们的MQTT挂了怎么办？

我们设计了**双通道告警冗余方案**：

**正常情况**：设备通过MQTT推送告警 → EMQX Broker → 后台服务处理

**MQTT故障时**：
1. **Kafka作为备用通道**：厂商通过HTTP接口推送告警到我们的REST接口，我们写入Kafka，消费者照常处理。对于能走HTTP的厂商，MQTT挂了切换无感知
2. **告警补偿轮询**：对于只支持MQTT的设备，后台定时任务（XXL-JOB）每5分钟主动轮询设备网关HTTP接口拉取未接收的告警，防止漏报
3. **EMQX集群化部署**：EMQX本身搭了集群（3节点），单节点故障会自动切换，大幅降低单点故障风险
4. **监控告警**：对MQTT连接数做监控，连接数骤降触发告警，5分钟内运维介入

**结果**：系统上线后实现零漏报，多次EMQX节点维护期间均无告警丢失。

---

## 第十章：Spring Cloud微服务

### 微服务包含哪些东西？他们的作用分别是什么？

微服务不是单一技术，是一套组件体系：

| 组件 | 作用 | 常用选型 |
|------|------|---------|
| **服务注册与发现** | 服务自动注册、互相找到对方 | Nacos、Eureka |
| **API 网关** | 统一入口，鉴权/限流/路由 | Spring Cloud Gateway、Kong |
| **配置中心** | 集中管理所有服务的配置，热更新 | Nacos Config、Apollo |
| **负载均衡** | 同一服务多实例时分流请求 | Ribbon、LoadBalancer |
| **服务调用** | 服务间HTTP调用（声明式） | OpenFeign |
| **熔断降级** | 服务故障时快速失败，保护整体 | Sentinel、Hystrix |
| **链路追踪** | 追踪请求经过哪些服务、哪里慢 | SkyWalking、Zipkin |
| **消息总线** | 服务间异步通信、事件驱动 | Kafka、RabbitMQ |

**我们项目用到的**：Spring Cloud Gateway（网关）+ Nacos（注册中心+配置中心）+ OpenFeign（服务调用）+ Sentinel（熔断限流）+ Kafka（异步消息）+ Docker/Nginx（部署）

---

### 什么是服务熔断和降级？

- 熔断：像家里的断路器，电流过大就断开，保护整个电路
- 降级：降级就是"退而求其次"，主要功能不行了，给个备用方案

```java
// 使用Sentinel实现熔断降级
@SentinelResource(
    value = "getAlarmList",
    fallback = "getAlarmListFallback",     // 业务异常时的降级方法
    blockHandler = "getAlarmListBlocked"   // 被限流/熔断时的处理方法
)
public List<AlarmVO> getAlarmList(Long factoryId) {
    return alarmFeignClient.getAlarms(factoryId);
}

// 降级方法（返回兜底数据）
public List<AlarmVO> getAlarmListFallback(Long factoryId, Throwable e) {
    log.error("获取告警列表失败，返回空列表", e);
    return Collections.emptyList();  // 返回空列表，而不是报错
}

// 被限流时的处理
public List<AlarmVO> getAlarmListBlocked(Long factoryId, BlockException e) {
    log.warn("告警查询被限流");
    return Collections.emptyList();
}
```

---

### 🆕 OpenFeign是什么？怎么用？

OpenFeign是Spring Cloud的声明式HTTP客户端，让服务间调用像调用本地方法一样简单。

```java
// 1. 定义Feign接口（像写Controller一样）
@FeignClient(name = "alarm-service", fallback = AlarmClientFallback.class)
public interface AlarmFeignClient {
    
    @GetMapping("/api/alarm/list")
    List<AlarmVO> getAlarms(@RequestParam Long factoryId);
    
    @PostMapping("/api/alarm/process")
    void processAlarm(@RequestBody AlarmDTO alarm);
}

// 2. 降级类（服务不可用时的兜底）
@Component
public class AlarmClientFallback implements AlarmFeignClient {
    @Override
    public List<AlarmVO> getAlarms(Long factoryId) {
        return Collections.emptyList();  // 返回空，而不是报错
    }
}

// 3. 直接注入使用（像调本地方法一样）
@Autowired
private AlarmFeignClient alarmFeignClient;

List<AlarmVO> alarms = alarmFeignClient.getAlarms(factoryId);
```

**底层原理**：Feign通过JDK动态代理生成接口的实现类，调用时通过Ribbon从注册中心获取服务实例列表，进行负载均衡，最终用HttpClient/OkHttp发起真实HTTP请求。

## 第十一章：AI相关

**AI底层如何实现——从零理解**：

```
你问AI："今天天气怎么样？"

AI处理过程：
1. 分词：把你的问题切成一个个词
   ["今天", "天气", "怎么样"]

2. 向量化：把每个词转成数字（电脑能理解）
   "今天" → [0.8, -0.2, 0.5, ...]（几千个数字）

3. Transformer计算：分析词与词之间的关系
   "天气"和"怎么样"关联性强，"今天"修饰"天气"

4. 预测下一个词：根据上下文，预测最可能出现的词
   "今天天气" → 接下来最可能是"晴" or "雨" or "不太好"

5. 重复预测：一个词一个词往后生成
   "今天天气不太好，..." → 逐词生成完整回答

本质：AI不是真的理解，而是从海量文本中学到了语言规律，
能预测"什么词后面最可能跟什么词"
```

---

### AI核心名词通俗解释

#### 1. LLM（大语言模型）

读了海量书籍的超级学生，能回答各种问题
- 代表：GPT-4、Claude、DeepSeek、通义千问、文心一言
- 特点：通过训练几乎"读遍"了互联网上的文字

#### 2. Token（令牌）

AI处理文字的基本单位，中文一般1个字=1-2个Token
```
"你好世界" → ["你", "好", "世", "界"] = 4个Token
计费通常按Token数量，输入+输出一起算
```

#### 3. Prompt（提示词）

你给AI的指令，Prompt写得好，回答质量高十倍

```
差的Prompt："写个代码"
好的Prompt：
"你是一个Java高级工程师，请用Spring Boot写一个
 根据设备ID查询最近24小时告警列表的REST接口，
 要求：分页查询、按时间倒序、返回JSON格式"

技巧：
- 给AI一个角色身份
- 描述清楚任务和背景
- 指定输出格式
- 给示例
```

#### 4. Embedding（向量化）

把文字转成一串数字，让电脑能计算文字之间的相似程度
```
"苹果" → [0.8, 0.2, -0.5, ...]
"橙子" → [0.7, 0.3, -0.4, ...]  ← 和苹果相似，数字接近
"汽车" → [-0.2, 0.9, 0.8, ...]  ← 和苹果差异大，数字差异大

向量距离越近 = 语义越相似
用途：语义搜索、推荐系统、RAG
```

#### 5. RAG（检索增强生成）

AI不知道你公司内部数据，RAG先帮你查出相关资料，再喂给AI回答。就像开卷考试，AI先查笔记再答题

```
用户问："北七家机房上月电费是多少？"

没有RAG：AI说"不知道，我没有这个数据"

有RAG：
1. 向量搜索：在你的数据库里搜"北七家 上月 电费"相关数据
2. 找到相关记录：5月用电量3000度，电价0.8元/度
3. 把数据喂给AI：
   "根据以下数据回答问题：北七家5月用电量3000度，单价0.8元/度。问：上月电费多少？"
4. AI回答："北七家上月电费为2400元（3000度×0.8元/度）"
```

#### 6. Text2SQL

用自然语言查数据库，不用写SQL。你说"给我看看北七家上周的告警"，AI自动生成SQL查出来

#### 7. Function Calling（函数调用）

给AI一个工具箱，AI根据问题自动决定用哪个工具

```
工具箱里有：[查告警、查能耗、发邮件、查设备状态]

用户问："北七家今天有没有高温告警，有的话发邮件给运维负责人"

AI自动规划：
步骤1：调用"查告警"工具，条件：北七家+今天+高温
步骤2：发现有3条高温告警
步骤3：调用"发邮件"工具，收件人：运维负责人，内容：高温告警详情
```

#### 8. Agent（智能体）

能自主规划任务、使用工具、执行多步骤任务的AI

- 普通AI：你问一句，它答一句（被动）
- Agent：你说目标，它自己规划步骤，调用各种工具完成任务（主动）

```
你说："帮我分析一下上个月各机房的能耗情况，
      找出能耗最高的前3个机房，并给出节能建议"

Agent执行过程（自动规划）：
步骤1：调用查询工具，获取上月各机房能耗数据
步骤2：对数据排序，找出TOP3
步骤3：分析能耗高的原因（查设备数据）
步骤4：结合行业经验，生成节能建议
步骤5：整理报告，返回给用户
```

#### 9. Vector Database（向量数据库）

专门存储向量（数字数组）的数据库，能快速找出"最相似"的数据

- 普通数据库：精确匹配（找名字叫"张三"的人）
- 向量数据库：相似匹配（找和"张三"最像的人）

**常用向量数据库**：
| 数据库 | 特点 |
|--------|------|
| Milvus | 开源，高性能，国内用得多 |
| Pinecone | 云服务，简单易用 |
| Chroma | 轻量级，适合本地开发 |
| pgvector | PostgreSQL插件，不用单独部署 |

#### 10. Chain of Thought（思维链，CoT）

让AI"先思考再回答"，就像做数学题先列步骤再给答案，准确率更高

```
没有CoT：
问：北七家有多少台设备出现了P1告警？
AI直接回答：（可能出错）

有CoT：
问：北七家有多少台设备出现了P1告警？
   请先分析问题，再给出答案。

AI思考过程：
1. 理解问题：需要统计北七家、P1级别、告警数量
2. 确定表：查alarm表
3. 条件：factory_location='北七家' AND alarm_level=1
4. 统计：用COUNT(DISTINCT device_id)统计设备数
5. 生成SQL：SELECT COUNT(DISTINCT device_id) FROM alarm 
            WHERE factory_location='北七家' AND alarm_level=1

AI回答：需要执行以下SQL：...
（准确率显著提升）
```

---

### AI在Java项目中的搭建

#### 网络与部署环境
GPU服务器（本地部署LLM必须）：中等规模用 A100/H100，小规模用RTX 4090集群也行
内网代理（如果用外部API如OpenAI/Claude）：搭一个HTTP代理或部署在DMZ区
容器化环境：Docker + Kubernetes，用于管理所有AI服务

#### 核心技术栈清单
| 技术领域 | 核心组件/技术 | 推荐方案/工具 | 选型理由与适用场景 |
| :--- | :--- | :--- | :--- |
| 大语言模型 (LLM) | 私有化部署<br>(数据不出域) | Qwen2.5<br>GLM-4<br>LLaMA 3 | Qwen2.5：中文能力极强，代码/逻辑推理优秀，开源生态好。<br>GLM-4：长文本处理能力强，适合处理复杂企业文档。<br>LLaMA 3：全球生态最强，适合英文场景或作为基座微调。 |
| | API 调用<br>(追求最强效果) | GPT-4o / o1<br>Claude 3.5 Sonnet | GPT-4o：综合推理能力最强，适合处理高难度任务。<br>Claude 3.5：代码生成与"类人"语感极佳，适合辅助编程和写作。 |
| Embedding 模型<br>(文本向量化) | 本地部署 | BGE-M3<br>BGE-large-zh | BGE-M3：支持多语言、长文本，检索精度高，是中文场景下的首选开源模型。 |
| | API 服务 | text-embedding-3<br>(OpenAI) | text-embedding-3-large：性能稳定，无需维护模型服务，适合快速验证或非敏感数据。 |
| 向量数据库<br>(知识库存储) | 大规模/企业级 | Milvus | 专为海量数据设计，性能强悍，支持分布式部署，适合拥有百万级文档的大型企业。 |
| | 中小规模/高性能 | Qdrant | 基于 Rust 开发，资源占用低且速度快，部署简单，适合大多数中型业务场景。 |
| | 轻量级/一体化 | pgvector | 基于 PostgreSQL 插件，如果公司已有 PG 数据库，直接复用即可，运维成本最低。 |
| RAG 框架<br>(检索增强生成) | 核心编排 | LangChain<br>LlamaIndex | LangChain：生态最全，组件丰富，适合构建复杂的 Agent 应用。<br>LlamaIndex：专注于数据处理和索引，在 RAG 数据流转上更细腻。 |
| Agent 框架<br>(智能体/工具调用) | 复杂任务编排 | LangGraph<br>AutoGen | LangGraph：基于 LangChain，擅长处理有状态、多步骤的复杂工作流（如审批流）。<br>AutoGen：微软出品，擅长多智能体对话协作（如一个写代码，一个检查代码）。 |
| 推理加速框架<br>(本地 LLM 运行) | 生产环境 | vLLM | 吞吐量极高，支持连续批处理，是私有化部署大模型的首选推理引擎。 |
| | 开发/测试 | Ollama | 一键运行，极其方便，适合本地开发调试或轻量级演示。 |
| | 官方优化 | TGI<br>(HuggingFace) | 专为 Transformer 模型优化，容器化部署友好，适合 HuggingFace 生态用户。 |
| 检索优化<br>(提升准确率) | 混合检索 | BM25 + 向量 | 结合关键词匹配（BM25）和语义匹配（向量），解决专有名词（如内部项目代号）搜不到的问题。 |
| | 重排序<br>(Rerank) | BGE-Reranker<br>Cohere Rerank | 在初步检索后进行二次精细排序，能显著提升 Top-K 结果的准确性，是 RAG 系统的"点睛之笔"。 |



#### 完整落地流程（按阶段）
第一阶段：搭基础（1-2个月）
确定数据安全边界（私有化 vs API）→ 搭GPU推理服务（vLLM/Ollama）→ 部署向量数据库（Milvus）→ 搭Java网关

第二阶段：做RAG知识库（1-2个月）
收集公司内部文档（手册、FAQ、规范）→ 用Python做文档解析+分块+Embedding入库 → 搭问答界面 → 测试召回准确率

第三阶段：集成业务系统（2-3个月）
让AI能查CRM、ERP等内部数据 → 用Agent框架编排工具调用 → 通过Java业务层做权限控制（谁能查什么数据）

第四阶段：规模化+优化（持续）
微调垂直领域模型 → 添加用量监控/成本统计 → A/B测试不同LLM效果 → 搭内部Prompt管理平台

### ai使用场景
1、智能客服与问答系统
电商平台的自动客服、企业内知识库问答。用户提问后，系统从知识库中检索相关信息，再由AI生成准确回答。
实现：通过HTTP客户端调用大模型API（OpenAI/通义千问），结合RAG检索私有知识库

2、企业知识库与文档问答
企业内部规章制度查询、产品说明书问答、法律文书检索。员工用自然语言提问，系统从海量文档中精准找到答案。
实现：文档解析(PDF/Word) → 文本分割 → Embedding向量化 → 存储到Milvus → 语义检索

3、Text2SQL智能数据查询
BI报表系统、经营数据分析。业务人员不需要会SQL，直接用中文问“上个月销售额最高的产品是什么？”就能得到答案。
实现：自然语言问题 → 语义解析 → 生成SQL → 执行查询 → 自然语言解释结果

4、智能客服工单系统（Agent + Tool Calling）
电商售后、IT服务台。AI不仅能回答问题，还能直接帮你查订单、退换货、创建工单。

5、财务报销智能审核系统
企业财务系统。员工上传发票照片，AI自动识别金额、判断是否符合报销规定，异常情况自动标记。

6、多Agent协同内容创作平台
自媒体团队、内容营销平台。4个AI角色分工协作：一个抓热点、一个想选题、一个写文章、一个总调度。

7、智能推荐系统
内容平台、电商网站。根据用户浏览历史，推荐相似文章或商品。

8、智能风控与异常检测
支付平台、金融机构。AI分析用户交易行为，识别刷单、套利、团伙欺诈等风险。

9、代码辅助与智能编程
开发者工具、IDE插件。AI帮你写代码、解释复杂逻辑、自动生成单元测试。

10、多模态内容理解与生成
智能相册管理、语音助手、视频内容分析。用户上传图片问“这张照片是在哪拍的？”，AI结合GPS信息和图像内容回答。


## 第十二章：场景问题
### 问了如果说遇到订单之类的，你准备怎么设计，数据库你怎么设计？

首先先设计表，看需要用到哪些表，还有幂等性处理（防止重复下单），还有事务处理（保证扣库存和创订单一致）。
### 除了基本工作开发之外，你有做过哪些事情能帮公司提效？
我通过看技术信息，给公司搭建了一个运维监控平台，普罗米修斯。编写了shell脚本，统一了日志规范化，方便查询看日志
### 你对未来是怎么规划的？
如果进入公司后，我会先把本职工作做好，快速适应业务开发，短期内深入研究 AI 与 Java 结合的技术，后续希望成为团队的技术骨干
### 前后端设计你有什么思路
接口定义要规范，其次性能和安全考虑，还有文档的编写，方便后续可以看文档
### 用户反馈页面响应慢，你从哪里排查？
首先确定是个别还是全部，然后看是接口慢还是静态资源慢？然后到网络、后端服务、sql、相关组件、服务器，从外到内一层层排查。
### 给你一个不熟悉的功能，你从哪开始做起？
首先搞明白要做什么、为什么做，理解需求

第二步看看公司有没有类似的功能可以借鉴，去网上搜类似的技术方案

然后设计一个方案，比如说画流程图、时序图，然后找领导或同事评审，确定是这个功能需求

然后我可以先做一个最小可行版本验证一下，确认方向对了再继续完善

遇到不会的技术，看官方文档、搜博客、问同事
### 你的优缺点是是什么？

优点：责任心强，我认为自己要对自己负责，无论是做事，还是工作
学习能力强，很多东西都是最开始不会的，都是我自己慢慢摸索
有主动性，遇到问题，会主动解决

缺点：在公开场合说话会紧张、有点强迫症，总感觉这个还可以有最优选择，会一直更新迭代新的技术，现在有根据给自己严格按照执行排期来平衡
### 如果上线后出了问题，你怎么办？
1. 第一时间回滚，保证用户可用
2. 看日志定位问题
3. 修复后在测试环境验证
4. 重新上线
5.  写复盘报告，避免下次再犯
### 如果让你带一个新人，你会怎么做？
1. 给他分配简单任务，让他熟悉项目
2. 定期看看他的代码，给反馈
3. 告诉他公司的开发流程和规范
4. 有问题先让他自己查，查不到再帮忙

### 你怎么看待加班？
我能接受项目紧急时加班，但我不喜欢无效加班。如果是因为效率低导致加班，我会想办法优化流程，提高效率

### 短信验证码登录和文字/图形验证码是怎么实现的？
短信验证码登录：前端校验格式，后端生成6位随机数字存入Redis，调用短信服务商API发短信，用户收到短信输入验证码，后端从Redis取验证码校验

文字/图形验证码：后端生成随机字符串（如"8A3F"），存入Redis设置过期时间5分钟，用JDK 自带的 AWT生成图片画板返回前端，前端输入后我去redis取出来对比

### 页面搜索提示是怎么出来的？ 比如输入今天，然后下面会展示今天天气怎么样，今天的新闻……
1. 前端存一个关键词数组，输入时过滤
2. 后端数据库模糊查询
3. Elasticsearch	倒排索引，分词匹配
4. 主要是前端监听输入框的 input 事件，然后设置一个防抖，不能用户每打一个字就发一次请求，然后去后端like查询

### 我看你写的全栈，前端你都用什么工具？ 组件都有哪些？ 比如
我前端主要是用vue结合Element Plus实现
常用的组件有Axios(调用接口，封装了请求拦截、响应拦截、超时重试)、Pinia(存用户信息、Token、系统配置)

## 第十三章：登录与鉴权

### JWT登录流程？
JWT就像景区门票，进门检验合法后领票，之后进每个景点刷票就行，不用每次去入口重新检验

```java
// JWT工具类
public class JwtUtil {
    private static final String SECRET = "your-secret-key-at-least-256-bits";
    private static final long EXPIRE = 30 * 60 * 1000;  // 30分钟

    // 生成Token
    public static String generateToken(Long userId, String role) {
        return Jwts.builder()
            .setSubject(String.valueOf(userId))
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRE))
            .signWith(SignatureAlgorithm.HS256, SECRET)
            .compact();
    }

    // 解析Token
    public static Claims parseToken(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET)
            .parseClaimsJws(token)
            .getBody();
    }
}

// 登录接口
@PostMapping("/login")
public Result<?> login(@RequestBody LoginDTO dto) {
    // 1. 查用户
    User user = userService.findByUsername(dto.getUsername());
    // 2. 验密码
    if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
        return Result.fail("密码错误");
    }
    // 3. 生成Token
    String token = JwtUtil.generateToken(user.getId(), user.getRole());
    return Result.success(token);
}

// Gateway统一鉴权
@Component
public class AuthGlobalFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        try {
            // 解析token，获取userId
            Claims claims = JwtUtil.parseToken(token.substring(7));
            String userId = claims.getSubject();

            // 把userId放到请求头，传给下游服务
            ServerHttpRequest newRequest = exchange.getRequest().mutate()
                .header("userId", userId)
                .build();
            return chain.filter(exchange.mutate().request(newRequest).build());
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}
```

---

## 第十四章：前端
### Vue 的生命周期（加载流程）?
一个 Vue 组件从创建到消失，会经历好几个阶段。

刚出生的时候叫创建完成，这时候数据已经有了，但页面还没画出来，我一般在这里去后端拿数据。

等页面画出来了，叫挂载完成，这时候我能看到页面上的按钮、输入框了，所以在这里操作页面元素，比如初始化图表、设置滚动条。

如果数据变了，页面会重新渲染，先触发更新前，然后更新完成。

最后组件要被关掉的时候，会触发销毁前，我在这里清理定时器、取消事件监听，防止内存泄漏。

最常用的就是创建完成（调接口）、挂载完成（操作页面）、销毁前（清理工作）。

### Vue 的响应式原理（数据变化怎么更新页面？）
Vue 2用Object.defineProperty劫持数据，Vue 3用Proxy代理整个对象。数据变化时通知依赖它的地方重新渲染页面

### v-if 和 v-show 的区别?
这两个指令都是用来控制元素显示和隐藏，
v-if是真的删除DOM，适合很少切换的场景；v-show是CSS隐藏，适合频繁切换，比如Tab切换

### ref 和 reactive 的区别?
ref一般用来存基本类型，取值要.value；reactive用来存对象，直接取值。模板里ref会自动解包，不用写.value。

### 浏览器从输入URL到页面展示的过程？
DNS解析域名成IP → TCP三次握手建立连接 → 发送HTTP请求 → 服务器返回响应 → 浏览器解析HTML、CSS、JS，渲染成页面

### 跨域是什么？怎么解决？
跨域是浏览器的安全限制。解决方式有CORS（后端加响应头）、代理转发（开发环境用）

### 父子组件通信怎么做？兄弟组件呢？
父传子用props，子传父用emit，兄弟用Pinia或事件总线

### 常用指令有哪些？作用是什么？
常用指令有v-bind动态绑定属性、v-model表单双向绑定、v-for列表循环、v-if条件渲染、v-on事件绑定。v-bind和v-on有简写形式：冒号和@。

## 第十五章：项目核心问题

### 千万级数据如何存储和查询？

1. ShardingSphere做水平分表
2. 建了复合索引
3. 超过3个月的数据定期归档到备份表

---

### Kafka高并发告警可靠性方案？

```
三个层面保证：

 消息不丢失：
 生产者acks=all，所有副本确认才算发送成功；
 消费者手动提交offset，处理成功才确认；
 引入死信队列，重试3次失败的消息转入DLQ，
 人工介入处理，同时发送告警给异常告警页面处理。

 消息不重复：
 Redis存储消息唯一ID（厂商+设备+时间+告警码），
 消费前SETNX校验，已处理则跳过；
 数据库层加唯一索引兜底，双重保障。

 消费延迟：
 按厂商分8个分片，对应8个消费者线程；
 监控Consumer Lag，超1000条触发预警；
 P1级关键告警设置MQTT双通道备用。

 上线后实现零漏报，成功规避多起机房安全隐患。"
```

---


### 你做过哪些性能优化，效果怎么样？

结合项目整理了几个有数据支撑的优化：

| 问题 | 方案 | 效果 |
|------|------|------|
| 核心查询8秒 | ShardingSphere分表 + 复合索引 | 优化到2秒以内 |
| 单表数据量过大 | 历史冷数据定期归档备份表 | 存储成本降低40% |
| 多厂商串行查询慢 | CompletableFuture并行 | 10秒→2秒 |
| 100万测点实时状态查DB慢 | Redis缓存设备实时状态 | 接口响应从秒级→毫秒级 |
| 告警处理重复 | Redis SETNX幂等 + DB唯一索引 | 零重复处理 |
| 告警漏报 | Kafka+MQTT双通道+死信队列补偿 | 零漏报 |

---

### 线程池的使用
告警消费线程池：Kafka消费者按厂商分了8个分区，对应8个消费者线程并行消费。每个消费者内部用线程池处理业务逻辑，核心线程数设置为4，最大16，队列容量500，这样单日峰值10万条告警消息能稳定消费完。

多厂商设备数据并行对接：平台接了10+家厂商，有些场景需要同时向多个厂商查询设备状态做汇总。用CompletableFuture.allOf()并行发起请求，原来串行要10秒，并行后缩短到2秒内。

## 第十六章：分布式
### 什么是分布式？
分布式就是把一个系统拆成多个独立的小系统，部署在不同机器上，通过网络互相调用，共同完成业务。好处是可以分开扩容、一个挂了不影响全部

### 分布式核心组件有哪些？
1、注册中心 — Nacos / Eureka / Zookeeper
核心作用：每个服务启动后，先把自己的 IP 和端口报给 Nacos 登记。别的服务想找你，直接去 Nacos 查一下就行，不用写死在代码里

2、负载均衡 — Nginx / Ribbon / OpenFeign
核心作用：负载均衡就是把请求分给多台机器。Nginx是服务端负载均衡，Ribbon是客户端负载均衡

3、消息队列 — Kafka / RocketMQ / RabbitMQ
核心作用：解耦、削峰（双11洪峰流量先存队列，慢慢处理）、异步

4、缓存 — Redis
核心作用：把常用的数据放内存里，下次用的时候直接从内存拿，不用去数据库查

5、API 网关 — Spring Cloud Gateway / Nginx
核心作用：网关是所有请求的入口，统一做登录校验、路由转发、限流熔断，不用每个服务都重复写这些代码。

6、远程调用 — OpenFeign / Dubbo / gRPC
核心作用：远程调用就是让一个服务能调用另一个服务的方法，像调本地一样简单。OpenFeign基于HTTP，Dubbo基于TCP，Dubbo性能更高。

7、熔断限流 — Sentinel / Hystrix
核心作用：量太大扛不住了，Sentinel 就限流，让一部分人先排队；如果某个服务坏了，就赶紧熔断或者给b选择

8、链路追踪 — Skywalking / Zipkin / Jaeger
核心作用：链路追踪能看清一个请求经过了哪些服务、每一步花了多长时间，方便排查慢调用和故障


### 分布式事务是什么？ 怎么解决
解释：多个服务里的数据操作，要么全部成功，要么全部失败

Seata（AT模式）：分布式事务解决跨服务的数据一致性问题。Seata AT模式最方便，加个注解就行，框架自动记录SQL前后镜像，出问题自动恢复

### 分布式锁有哪些？ 
Redis：用setnx命令，谁抢到谁干活
Redis (Redisson)：在原有redi机制上添加了看门狗机制，自动续期
Zookeeper：临时顺序节点，性能差一点


## 第十六章：锁

### MySQL锁
🔓 表锁（Table Lock）
整张表都锁住，其他人啥都干不了。就像把整个书架锁起来，你看一本书，别人连摸都不能摸。
并发差开销小MyISAM默认
LOCK TABLES users WRITE;
-- 做操作...
UNLOCK TABLES;
场景：全表统计、数据迁移、MyISAM引擎。并发量低、读多写少时用。


🔏 行锁（Row Lock）
只锁你操作的那几行。你锁 id=1 这行，别人还能操作 id=2。就像你只锁了书架上你正在看的那本书。
并发好开销大InnoDB默认
SELECT * FROM users WHERE id=1 FOR UPDATE;
-- ⚠️ 必须走索引，否则升级为表锁！
场景：电商下单、余额扣减、任何高并发写操作。


🔐 间隙锁（Gap Lock）
不锁具体的行，锁的是"空隙"。比如你查 id 在 10~20 之间，就把这个区间锁住，别人不能在里面插数据。
防幻读可重复读级别
SELECT * FROM users
WHERE age BETWEEN 18 AND 25 FOR UPDATE;
-- 18~25 这个区间被锁，不能插入新数据
场景：InnoDB 可重复读隔离级别自动加，防止幻读问题。


🗝️ 临键锁（Next-Key Lock）
行锁 + 间隙锁的组合。锁当前行，也锁当前行之前的间隙。InnoDB 默认就是这个，同时防止幻读和不可重复读。
InnoDB默认防幻读
场景：InnoDB 默认行为，无需手动设置。理解它是为了排查死锁。


📖 共享锁（S锁 / 读锁）
我读这行，你也可以读，但谁都不能改。就像图书馆的书，大家都能翻，但不能划线。
多人可读不能写
SELECT * FROM users WHERE id=1 LOCK IN SHARE MODE;
场景：读取数据时不想被别人修改，但允许别人同时读。


✏️ 排他锁（X锁 / 写锁）
我操作这行，别人啥都干不了，读也不行。就像你正在用铅笔改书，别人连看都不让看。
独占不可读不可写
SELECT * FROM users WHERE id=1 FOR UPDATE;
-- 或者 UPDATE/DELETE 自动加排他锁
场景：更新余额、扣库存、任何需要"先读后写"的操作。


🏛️ 意向锁（IS / IX）
这是 MySQL 内部自己用的锁，不需要你手动加。它告诉其他人："这张表里有行被锁了"，让加表锁的人知道能不能加。
自动管理无需手动
场景：InnoDB 内部机制，了解概念即可，面试能说出来就加分。



### Java锁
```java
🔒 synchronized（内置锁）
Java 最基础的锁。加在方法或代码块上，同时只有一个线程能进去执行。就像厕所只有一个坑，一人用完下一个才能进。
简单好用不可中断
// 加在方法上，锁的是this对象
public synchronized void pay() { ... }

// 加在代码块上，锁的是指定对象
synchronized(this) {
balance -= 100;
}
场景：简单的线程安全场景，并发量不高时首选。



⚙️ ReentrantLock（可重入锁）
比 synchronized 更灵活。可以设置等待超时、可以被中断、可以公平排队。可重入 = 同一个线程可以重复加锁不死锁。
功能强可中断需手动释放
ReentrantLock lock = new ReentrantLock();
lock.lock();        // 加锁
try {
balance -= 100;
} finally {
lock.unlock();  // 必须放finally！
}
场景：需要超时等锁、需要公平锁、需要中断等待的场景。



📚 ReadWriteLock（读写锁）
读读不互斥，读写互斥，写写互斥。就像图书馆：多人可以同时看书，但有人在改书时其他人等着。读多写少时性能翻倍。
读并发高读多写少场景
ReadWriteLock rwLock = new ReentrantReadWriteLock();

// 读操作 - 多线程可同时进
rwLock.readLock().lock();

// 写操作 - 独占
rwLock.writeLock().lock();
场景：缓存系统、配置读取。读操作远多于写操作时性能极好。



⚡ volatile（可见性保证）
不是真正的锁，但解决"一个线程改了，另一个线程看不见"的问题。保证变量对所有线程立即可见。但不保证原子性！
只保证可见性不保证原子性
// ✅ 适合：状态标志位
volatile boolean running = true;

// ❌ 不适合：需要原子操作的场景
volatile int count = 0;
count++;  // 不安全！用AtomicInteger
场景：停止标志、单例模式双重检查锁（DCL）。



🚀 Atomic（原子类）
底层用 CAS（Compare And Swap）实现无锁并发。不用真正加锁，性能比 synchronized 好很多。适合计数器、ID生成。
无锁高性能CAS实现
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();  // 线程安全的 count++
count.compareAndSet(0, 1); // CAS操作

// 其他：AtomicLong, AtomicReference
场景：计数器、序列号生成、高并发统计。



🔄 StampedLock（邮戳锁）
ReadWriteLock 的升级版。增加了"乐观读"：读的时候不加锁，读完检查有没有被改过。如果没改就直接用，改了才加锁重读。
性能最好使用复杂
StampedLock sl = new StampedLock();
long stamp = sl.tryOptimisticRead(); // 乐观读
// 读数据...
if (!sl.validate(stamp)) { // 被改过了？
stamp = sl.readLock(); // 重新加读锁
}
场景：读多写少且对性能要求极高的场景，如实时行情数据。



😊 乐观锁 vs 悲观锁（思想）
这是两种思想，不是具体的类。
悲观锁：总觉得会有冲突，先加锁再操作（synchronized, ReentrantLock）
乐观锁：觉得不会冲突，操作完再检查（CAS, 数据库版本号）
悲观=先锁后用乐观=用完再查
-- 数据库乐观锁：版本号方式
UPDATE goods SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 3  -- 版本不对就失败
场景：乐观锁适合冲突少的场景（如点赞）；悲观锁适合冲突多（如抢票）。



🌐 ThreadLocal（线程私有）
不是锁，但解决线程安全问题。每个线程有自己的副本，互不干扰。就像每人有自己的记事本，不用抢，不用锁。
无竞争注意内存泄漏
ThreadLocal<User> userHolder = new ThreadLocal<>();
userHolder.set(currentUser);  // 当前线程存
userHolder.get();             // 当前线程取
userHolder.remove();          // 用完必须remove！
场景：存储当前用户信息、数据库连接、Spring 的事务管理。

## 索引
为什么走索引就快？底层是什么？
🌳 底层原理：B+ Tree（B+树）
索引的底层是一棵 B+树。想象你要在一本1000页的字典里找"苹果"这个词：

没有索引（全表扫描）：从第1页翻到第1000页，一页一页找 → 慢死了
有索引（B+树）：先看目录→找到"S苹"开头在第300-400页→直接翻到300页→找到 → 超级快

B+树的特点：所有数据都在叶子节点，叶子节点之间有链表连接，范围查询超快。树的高度一般只有3-4层，查一条数据最多只需要3-4次磁盘IO！
聚簇索引
主键索引，叶子节点直接存整行数据。找到索引就找到数据了。InnoDB 必有一个。
-- 主键就是聚簇索引
PRIMARY KEY (id)
非聚簇索引（二级索引）
普通索引，叶子节点存的是主键值，找到后还要回表查一次主键索引才能拿到完整数据。
-- 普通索引需要回表
CREATE INDEX idx_name ON users(name);
-- 先找到name→拿到id→再查id→拿到数据
💡 回表：用普通索引查询时，找到主键后还要去主键索引再查一次完整数据，这叫回表。覆盖索引可以避免回表：查询的字段刚好都在索引里，就不用回表了！
❌ 索引失效的场景（面试必考！）
1. 对索引列用函数
   为什么失效？函数改变了列的值，MySQL不知道该去B+树的哪个节点找了，只能全表扫。
   ❌ WHERE YEAR(create_time) = 2024
   ✅ WHERE create_time BETWEEN '2024-01-01' AND '2024-12-31'
2. 模糊查询左边有 %
   为什么失效？B+树是按前缀排序的。%张 等于"不知道开头是啥"，没法在树上找，只能全扫。
   ❌ WHERE name LIKE '%张'
   ✅ WHERE name LIKE '张%'  ← 右边有%没问题
3. 索引列参与运算
   为什么失效？B+树存的是 age 的原始值，你算的是 age+1，MySQL没法直接找，变成全表扫。
   ❌ WHERE age + 1 = 18
   ✅ WHERE age = 17
4. 类型不匹配（隐式转换）
   为什么失效？phone 是 varchar，你传了数字 138，MySQL 自动转换相当于对列用了函数，索引废掉了。
   ❌ WHERE phone = 13800138000  ← phone是varchar
   ✅ WHERE phone = '13800138000'
5. OR 连接非索引列
   为什么失效？name有索引，address没有。OR 意味着两个条件任一满足即可，address那边没索引只能全扫，干脆全部全扫算了。
   ❌ WHERE name='张三' OR address='北京'
   ✅ 给address也加索引，或者改成UNION
6. 联合索引不走最左前缀
   为什么失效？联合索引(a,b,c)是按 a→b→c 的顺序建树的。你跳过a直接查b，等于字典没有第一个字，不知道从哪翻，只能全扫。
   -- 建了联合索引 (name, age, city)
   ✅ WHERE name='张' AND age=18    ← 走索引
   ❌ WHERE age=18 AND city='北京'  ← 跳过name，失效
7. NOT IN / NOT EXISTS / !=
   为什么失效？这类"排除型"查询可能命中大部分数据，MySQL判断全表扫比用索引更快，就直接全扫了（优化器决定的）。
   ❌ WHERE status != 1
   ❌ WHERE id NOT IN (1, 2, 3)
   ✅ 确保结果集小时，MySQL可能还会走索引
8. 数据量太小或区分度太低
   为什么失效？索引列只有"男/女"两个值，区分度极低。MySQL算了一下：用索引再回表反而更慢，还不如直接全表扫。
   -- 性别列加索引，基本没用
   CREATE INDEX idx_gender ON users(gender);
   -- 查男性=查一半数据，回表代价太大

```